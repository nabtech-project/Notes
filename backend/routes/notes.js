const router = require("express").Router();
const Note = require("../models/Note");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
    const notes = await Note.find({ userId: req.user.id });
    res.json(notes);
});

router.post("/", auth, async (req, res) => {
    const note = await Note.create({
        userId: req.user.id,
        title: req.body.title,
        content: req.body.content
    });
    res.json(note);
});

router.put("/:id", auth, async (req, res) => {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(note);
});

router.delete("/:id", auth, async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json("Deleted");
});

module.exports = router;
