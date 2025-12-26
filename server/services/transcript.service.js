import { Supadata } from '@supadata/js';
import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const supadata = new Supadata({
    apiKey: process.env.SUPADATA_API_KEY,
});

export const getTranscript = async (videoUrl) => {
  
    try {
        const transcriptData = await supadata.transcript({ url: videoUrl });

        const fullText = transcriptData.content.map(item => item.text).join(" ");
        
        return fullText;

    } catch (err) {
        console.log("Transcript not found → using Whisper fallback");

        const audioPath = await downloadAudio(videoId);
        const transcript = await whisperTranscript(audioPath);
        return transcript;
    
    }
};

const downloadAudio = (videoId) => {
    return new Promise((resolve) => {
        const filePath = `./audio-${videoId}.mp3`;

        ytdl(`https://www.youtube.com/watch?v=${videoId}`, { filter: "audioonly" })
            .pipe(fs.createWriteStream(filePath))
            .on("finish", () => resolve(filePath));
    });
};

const whisperTranscript = async (audioPath) => {

    const response = await openai.audio.transcriptions.create({
        file: fs.createReadStream(audioPath),
        model: "gpt-4o-transcribe",
    });

    return response.text;
};

