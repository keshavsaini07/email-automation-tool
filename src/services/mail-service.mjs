import { StatusCodes } from "http-status-codes";
import { User } from "../models/user.mjs";
import AppError from "../utils/errors/app-error.js";
import { google } from "googleapis";

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
      const msg = await gmail.users.messages.get({
        userId: "me",
        id: message.id
      });
      // console.log(msg)
      console.log(`Subject: ${msg.data.snippet}`);
    }
    return res.data.messages || [];
  } catch (error) {
    console.log(error);
  }
}

export default {
  fetchEmails,
};
