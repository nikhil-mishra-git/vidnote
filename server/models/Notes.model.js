import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    youtubeUrl: String,
    title: String,
    thumbnail: String,
    author:String,
    summary: String,
    notes: String,

    mcqs: Array,
    flashcards: Array

}, { timestamps: true });

export default mongoose.model("Notes", NotesSchema);
