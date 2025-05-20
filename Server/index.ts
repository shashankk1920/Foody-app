import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import restauntRoutes from "./routes/resturant.routes";
import menuRoutes from "./routes/menu.route";
import orderRoute from "./routes/order.route";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Default middlewares
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

app.use(cors(corsOptions));

// API routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/restaurant", restauntRoutes);
app.use("/api/v1/menu", menuRoutes);
app.use("/api/v1/order", orderRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
