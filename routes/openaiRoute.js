const express = require("express");
const route = express.Router();
const { generateImg, generateText } = require("../controllers/openaiContoller");
route.post("/img", generateImg);
route.post("/text", generateText);
route.get("/", (req, res) => {
  res.status(200).json({ message: "Server running" });
});

module.exports = route;
