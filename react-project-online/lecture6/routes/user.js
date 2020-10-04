const express = require("express");
const router = express.Router();

router.get("/:id", (req, res, next) => {
  res.send(`Received a GET request, param: ${req.params.id}`);
});

router.post("/", (req, res, next) => {
  res.json({ success: true });
});

router.put("/", (req, res, next) => {
  res.status(400).json({ message: "404 BAD REQUEST" });
});

router.delete("/", (req, res, next) => {
  res.send(`Received a DELETE request!`);
});

module.exports = router;
