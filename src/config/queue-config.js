import { Queue, Worker } from "bullmq";
import { MailService, ResponseService } from "../services/index.mjs";
import AppError from "../utils/errors/app-error.js";

const redisOptions = { host: "127.0.0.1", port: 6379 };

const fetchedEmailsQueue = new Queue("fetchedEmails");

async function sendToQueue(msgId, accessToken, emailId) {
  const res = await fetchedEmailsQueue.add(
    "email",
    {
      msgId: msgId,
      accessToken: accessToken,
      emailId : emailId,
    },
    {
    //   removeOnComplete: true,
      removeOnFail: true,
    }
  );
  console.log("Job added to queue", res.id);
}

async function processQueue(job) {
  try {
    const { msgId, accessToken, emailId } = job.data;
    // console.log("inside worker", job.id)

    const data = { msgId, accessToken };

    const response = await ResponseService.generateResponse(data);
    if(response){
        let emailContent = JSON.parse(response);
        // console.log(emailContent)
        let data = { msgId, accessToken, emailId, emailContent };
        await MailService.sendMail(data);
        console.log("Email Sent for Job", job.id)
    }
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot fetch emails from client",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

const processEmailWorker = new Worker("fetchedEmails", processQueue, {
  connection: redisOptions,
});

export default {
  sendToQueue,
  processQueue,
};
