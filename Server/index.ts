import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
dotenv.config();

connectDB();
const app = express();


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
