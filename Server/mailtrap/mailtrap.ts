import {MailtrapClient} from "mailtrap";
import dotenv from "dotenv";

dotenv.config();
const ENDPOINT = "https://mailtrap.io/api/v1/inboxes";



console.log("MAILTRAP_API_TOKEN:", process.env.MAILTRAP_API_TOKEN);
export const client = new MailtrapClient({ token: process.env.MAILTRAP_API_TOKEN! });

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "FOODY APP",
};