import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.use(
    cors({
        origin: "https://your-hr-three.vercel.app",
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", UserRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});
