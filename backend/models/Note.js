const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    userId: String,
    title: String,
    content: String
}, { timestamps: true });

module.exports = mongoose.model("Note", NoteSchema);
