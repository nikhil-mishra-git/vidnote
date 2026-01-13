import Notes from "../models/Notes.model.js";
import User from "../models/User.model.js"
import { extractVideoId } from "../utils/extractVideoId.js";
import { getVideoMetadata } from "../services/youtube.service.js";
import { getTranscript } from "../services/transcript.service.js";
import { generateAIContent } from "../services/ai.service.js";

export const generateNotes = async (req, res) => {
  try {
    const { youtubeUrl } = req.body;
    const userId = req.user._id;

    const videoId = extractVideoId(youtubeUrl);

    if (!videoId) {
      return res.status(400).json({ message: "Invalid YouTube URL" });
    }

    const meta = await getVideoMetadata(videoId);
    const transcript = await getTranscript(youtubeUrl);
    const aiData = await generateAIContent(transcript);

    const savedData = await Notes.create({
      user: userId,
      youtubeUrl: youtubeUrl,
      title: meta.title,
      thumbnail: meta.thumbnail,
      author: meta.author,
      summary: aiData.summary,
      notes: aiData.notes,
      mcqs: aiData.mcqs,
      flashcards: aiData.flashcards
    });

    await User.findByIdAndUpdate(userId, {
      $push: { generatedNotes: savedData._id }
    });

    res.status(200).json({
      success: true,
      data: savedData
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
