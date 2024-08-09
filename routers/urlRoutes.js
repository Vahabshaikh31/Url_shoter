const express = require("express");
const { handleGenerateNewUrl } = require("../controllers/urrl");
const router = express.Router();

router.post("/", handleGenerateNewUrl);

module.exports = router;
