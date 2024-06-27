import { StatusCodes } from "http-status-codes";
import AppError from "../utils/errors/app-error.js";
import { ServerConfig } from "../config/index.js";
import { GoogleGenerativeAI } from  "@google/generative-ai";

async function generateResponse() {
  try {
      const genAI = new GoogleGenerativeAI(ServerConfig.GOOGLE_API_KEY);
      // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = "Generate an email response for the below email \n <email-content>";

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      // console.log(text);
      return text;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Something went wrong, cannot generate response for email content",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export default {
  generateResponse,
};
