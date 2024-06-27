import { StatusCodes } from "http-status-codes";
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
      maxResults: 1,
      q: "is:inbox -category:{social promotions updates forums}",
    });
    const messages = res.data.messages;

    const msg = await gmail.users.getProfile({
      userId: "me",
    });
    const emailId = msg.data.emailAddress;
    console.log(emailId);

    for (const message of messages) {
      // console.log(message.id);
      QueueConfig.sendToQueue(message.id, accessToken, emailId);
    }

    return res.data.messages || [];
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot fetch emails from client",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function fetchEmailContent(data) {
  try {
    const authClient = new google.auth.OAuth2();
    authClient.setCredentials({ access_token: data.accessToken });
    const gmail = google.gmail({ version: "v1", auth: authClient });

    const msg = await gmail.users.messages.get({
      userId: "me",
      id: data.msgId,
    });
    let emailContent;
    if (msg.data.payload.parts) {
      emailContent = msg.data.payload.parts
        .filter((part) => part.mimeType === "text/plain")
        .map((part) => Buffer.from(part.body.data, "base64").toString("utf-8"))
        .join(" ");
    }
    console.log(
      msg.data.payload.headers.find((header) => header.name === "From").value
    );
    // console.log(emailContent)
    return emailContent;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot fetch email content from client",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function sendMail(data) {
  try {
    const authClient = new google.auth.OAuth2();
    authClient.setCredentials({ access_token: data.accessToken });
    const gmail = google.gmail({ version: "v1", auth: authClient });

    const originalEmail = await gmail.users.messages.get({
      userId: "me",
      id: data.msgId,
    });

    const emailTo = originalEmail.data.payload.headers.find(
      (header) => header.name === "From"
    ).value;

    const message = [
      'Content-Type: text/plain; charset="UTF-8"',
      "MIME-Version: 1.0",
      "Content-Transfer-Encoding: 7bit",
      `To: ${emailTo}`,
      `Subject: Re: ${
        originalEmail.data.payload.headers.find(
          (header) => header.name === "Subject"
        ).value
      }`,
      "",
      data.emailContent.email.body,
    ].join("\n");

    const encodedMessage = Buffer.from(message)
      .toString("base64")
      .replace(/\+/g, "-") // Replace '+' with '-'
      .replace(/\//g, "_") // Replace '/' with '_'
      .replace(/=+$/, ""); // Remove trailing '=' characters

    console.log(encodedMessage);
    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
        // threadId: threadId,
      },
    });
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Something went wrong, cannot send an email response",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export default {
  fetchEmails,
  fetchEmailContent,
  sendMail,
};
