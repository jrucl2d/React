const router = require("express").Router();
const Exercise = require("../model/exercise.model");

router.get("/", async (req, res, next) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    console.error(err);
    res.status(400).json("Error: " + err);
  }
});

router.post("/add", async (req, res, next) => {
  const username = req.body.username;
  const desc = req.body.desc;
  const duration = +req.body.duration;
  const date = Date.parse(req.body.date);
  try {
    await Exercise.create({
      username,
      desc,
      duration,
      date,
    });
    res.json("Exercise added!");
  } catch (err) {
    console.error(err);
    res.status(400).json("Error: " + err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    res.json(exercise);
  } catch (err) {
    console.error(err);
    res.status(400).json("Error: " + err);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    await Exercise.findByIdAndDelete(req.params.id);
    res.json("Exercise deleted");
  } catch (err) {
    console.error(err);
    res.status(400).json("Error: " + err);
  }
});

router.put("/update/:id", async (req, res, next) => {
  try {
    await Exercise.update(
      { _id: req.params.id },
      {
        username: req.body.username,
        desc: req.body.desc,
        duration: +req.body.duration,
        date: Date.parse(req.body.date),
      }
    );
    res.json("Exercise updated!");
  } catch (err) {
    console.error(err);
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
