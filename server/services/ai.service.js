import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const generateAIContent = async (transcript) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: `
You are a backend API service.

You MUST follow these rules strictly:
1. Respond in SIMPLE ENGLISH ONLY.
2. NEVER use Hindi or any other language.
3. DO NOT use markdown symbols.
4. DO NOT add extra text outside JSON.
5. Output MUST be valid JSON and parseable.
6. Follow the JSON structure EXACTLY.
          `
        },
        {
          role: "system",
          content: `
Generate learning content from a YouTube transcript.

IMPORTANT INSTRUCTIONS:

SUMMARY:
- Must be detailed and well explained.
- Length: around 4–5 proper paragraphs.
- Explain the main idea clearly for beginners.

NOTES:
- Start with a clear title.
- Use bullet points (use "-" only).
- Notes must be structured and easy to revise.

MCQs:
- Generate EXACTLY 5 MCQs.
- Each MCQ must have 4 options.
- Clearly mark the correct answer.
- Options array length MUST be 4 only.
- The "answer" field MUST contain ONLY write answer.

FLASHCARDS:
- Generate EXACTLY 5 flashcards.
- Short and direct question–answer format.
- Anser must be 1 or 2 lines.

Return STRICT JSON ONLY in this format:

{
  "summary": "string",
  "notes": "string",
  "mcqs": [
    {
      "question": "string",
      "options": ["A", "B", "C", "D"],
      "answer": "string"
    }
  ],
  "flashcards": [
    {
      "question": "string",
      "answer": "string"
    }
  ]
}
          `
        },
        {
          role: "user",
          content: transcript
        }
      ]
    });

    return JSON.parse(response.choices[0].message.content);

  } catch (error) {
    console.error("AI generation failed:", error);
    throw new Error("AI content generation failed");
  }
};
