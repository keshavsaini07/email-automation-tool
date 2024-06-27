import { Queue } from "bullmq";

const fetchedEmailsQueue = new Queue("fetchedEmails");

async function sendToQueue(msgId, accessToken) {
  const res = await fetchedEmailsQueue.add("email", { msgId : msgId, accessToken: accessToken });
  console.log("Job added to queue", res.id);
}

export default {
    sendToQueue,
}