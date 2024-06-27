import { StatusCodes } from "http-status-codes";
import AppError from "../utils/errors/app-error.js";
import { ServerConfig } from "../config/index.js";
import { GoogleGenerativeAI } from  "@google/generative-ai";
import { MailService } from "./index.mjs";

async function generateResponse(data) {
  try {
      const genAI = new GoogleGenerativeAI(ServerConfig.GOOGLE_API_KEY);
      // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const emailContent = await MailService.fetchEmailContent(data);

      const prompt = `Analyze the email given below, classify it as spam, important or general, and generate an appropriate email response for it. Attach the classification in labels tag and email response to email tag. To provide the response, firstly insert all of them in a json object (with response object having two fields - subject and body)  and lastly converting this object into a string. Change any relevent names from provided email to the new mail. \n ${emailContent}`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      
      const text = response.text().replace("```", "").replace("```", "").replace("json", "");

      // console.log(text);
      return emailContent ? text : false;
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
