import { StatusCodes } from "http-status-codes";
import { User } from "../models/user.mjs";
import AppError from "../utils/errors/app-error.js";
import { google } from "googleapis";
import { QueueConfig } from "../config/index.js";

async function fetchEmails(accessToken) {
  try {
    const authClient = new google.auth.OAuth2();
    authClient.setCredentials({ access_token: accessToken });
    const gmail = google.gmail({ version: "v1", auth: authClient });
    const res = await gmail.users.messages.list({
      userId: "me",
      maxResults: 10,
      q: "is:inbox -category:{social promotions updates forums}",
    });
    const messages = res.data.messages;
    for (const message of messages) {
      // console.log(message.id);
      QueueConfig.sendToQueue(message.id)
    }
    return res.data.messages || [];
  } catch (error) {
    console.log(error);
    throw new AppError("Cannot fetch emails from client",
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}


export default {
  fetchEmails,
};
