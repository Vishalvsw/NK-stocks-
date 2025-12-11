import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateCourseSyllabus = async (topic: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a 5-item detailed course curriculum syllabus for a stock market course about "${topic}". Return ONLY the list items as plain text lines, no numbers or markdown bullets.`,
    });
    
    const text = response.text || '';
    return text.split('\n').filter(line => line.trim().length > 0);
  } catch (error) {
    console.error("Failed to generate syllabus:", error);
    return [
      "Introduction to Market Basics",
      "Understanding Charts and Patterns",
      "Risk Management Strategies",
      "Psychology of Trading",
      "Advanced Execution Techniques"
    ];
  }
};

export const generateBlogContent = async (topic: string): Promise<{title: string, content: string}> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short, engaging blog post about "${topic}" for a stock market audience. Return a JSON object with "title" and "content" fields. The content should be about 150 words.`,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || '{}';
    return JSON.parse(text);
  } catch (error) {
    console.error("Failed to generate blog:", error);
    return {
      title: `${topic} - Market Insights`,
      content: "The stock market is ever-changing. Understanding the fundamental principles behind this topic is crucial for long-term success. Join our courses to learn more about how to navigate these trends effectively."
    };
  }
};