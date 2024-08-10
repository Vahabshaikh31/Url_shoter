const express = require("express");
const app = express();
const port = 8000;
const database = require("./connector");
const URLroute = require("./routers/urlRoutes");
const userRouter = require("./routers/userRouter");
const staticRouters = require("./routers/staticRouteers");
const cookieParser = require("cookie-parser");
const URL = require("./module/url");
const path = require("path");
const { restrictToLoggedUserOnly, checkAuth } = require("./middleware/auth");

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Route Handlers
app.use("/api/url", restrictToLoggedUserOnly, URLroute);
app.use("/user", userRouter);
app.use("/", checkAuth, staticRouters);

// Set up EJS for templating
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Route for handling short URL redirection
app.get("/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: { visitHistory: { timestamp: Date.now() } },
      },
      { new: true }
    );

    if (entry) {
      return res.redirect(entry.redirectUrl);
    } else {
      return res.status(404).send("Short URL not found");
    }
  } catch (error) {
    console.error("Error during redirect:", error);
    return res.status(500).send("Internal Server Error");
  }
});

database()
  .then(() => {
    app.listen(port, () => console.log(`App listening on port ${port}!`));
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
