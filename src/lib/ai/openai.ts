import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  console.warn("Missing OPENAI_API_KEY environment variable. Using placeholder for build.");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "sk-placeholder",
});

export async function generateText(prompt: string, systemPrompt: string = "You are an expert AI content creator.") {
  const response = await openai.chat.completions.create({
    model: "gpt-4o", // Or gpt-3.5-turbo if cost is a concern
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt }
    ],
    temperature: 0.7,
  });

  return response.choices[0].message.content;
}
