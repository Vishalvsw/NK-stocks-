import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Google GenAI client using the required environment variable
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a structured blog content based on a topic.
 */
export const generateBlogContent = async (topic: string): Promise<{title: string, content: string}> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a professional blog post about "${topic}" for Indian traders. Return strictly JSON with title and content fields.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING },
          },
          required: ["title", "content"],
        },
      },
    });

    const data = JSON.parse(response.text || '{}');
    return {
      title: data.title || `Insights on ${topic}`,
      content: data.content || "Analysis coming soon."
    };
  } catch (error) {
    console.error("Failed to generate blog:", error);
    return { title: `Update on ${topic}`, content: "Content currently being drafted." };
  }
};

/**
 * Generates a course syllabus/curriculum list based on a course title.
 */
export const generateCourseSyllabus = async (title: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create a professional 5-point syllabus for a stock market course titled "${title}". Return strictly JSON as a string array.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
      },
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Failed to generate syllabus:", error);
    return ["Introduction", "Fundamental Basics", "Technical Setup", "Risk Management", "Live Trading"];
  }
};