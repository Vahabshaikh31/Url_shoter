const express = require("express");
const URL = require("../module/url");
const shortid = require("shortid");

const handleGenerateNewUrl = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "Url is required" });

  // Ensure the URL includes the protocol
  const formattedUrl =
    url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `http://${url}`;

  const shortID = shortid.generate();

  await URL.create({
    shortId: shortID,
    redirectUrl: formattedUrl,
    visitHistory: [{}],
  });
 return res.render("home" , {id : shortID})
  // return res.json({ id: shortID });
};

module.exports = { handleGenerateNewUrl };
