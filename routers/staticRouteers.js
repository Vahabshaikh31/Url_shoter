const express = require("express");
const URL = require("../module/url");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // if (!req.user) return res.redirect("/login");
    console.log(req.user);
    const allUrls = await URL.find({
      // createdBy: req.user._id
    });
    return res.render("home", { urls: allUrls });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  if (req.user) return res.redirect("/"); // Redirect if already logged in
  return res.render("login");
});

module.exports = router;
