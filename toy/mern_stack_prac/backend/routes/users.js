const router = require("express").Router();
const User = require("../model/user.model");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(400).json("Error: " + err);
  }
});

router.post("/add", async (req, res, next) => {
  const username = req.body.username;
  try {
    await User.create({
      username,
    });
    res.json("User added!");
  } catch (err) {
    console.error(err);
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
