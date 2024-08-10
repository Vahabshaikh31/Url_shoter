const express = require("express");
const URL = require("../module/url");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allurls = await URL.find({}); // Fetch all URLs from the database
    return res.render("home", {
      urls: allurls, 
    });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
