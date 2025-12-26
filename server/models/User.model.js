import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,

  generatedNotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notes"
    }
  ]

}, { timestamps: true });

export default mongoose.model("User", userSchema);
