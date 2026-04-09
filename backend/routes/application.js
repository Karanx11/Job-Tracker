
const router = require("express").Router();
const Application = require("../models/Application");

router.post("/", async (req, res) => {
  const app = new Application(req.body);
  await app.save();
  res.json(app);
});

router.get("/", async (req, res) => {
  const apps = await Application.find();
  res.json(apps);
});

router.put("/:id", async (req, res) => {
  const updated = await Application.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Application.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

module.exports = router;