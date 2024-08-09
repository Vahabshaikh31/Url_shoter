const express = require("express");
const app = express();
const port = 8000;
const database = require("./connector");
const URLroute = require("./routers/urlRoutes");
const staticRouteers = require("./routers/staticRouteers");
const URL = require("./module/url");
const path = require("path");


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api/url", URLroute);
app.use("/", staticRouteers);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true } // Ensures the updated document is returned
  );

  console.log(entry);

  if (entry) {
    res.redirect(entry.redirectUrl);
  } else {
    res.status(404).json({ error: "Short URL not found" });
  }
});

database()
  .then(() => {
    app.listen(port, () => console.log(`app listening on port ${port}!`));
  })
  .catch((err) => {
    console.log(err);
  });
