import { Queue } from "bullmq";

const fetchedEmailsQueue = new Queue("fetchedEmails");

async function sendToQueue(msgId){
    const res = await fetchedEmailsQueue.add("email", msgId);
    console.log("Job added to queue", res.id);
}

export default {
    sendToQueue,
}