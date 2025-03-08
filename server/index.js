import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import videoRoutes from "./routes/video.route.js";
import commentRoutes from "./routes/commentRoutes.js";
import { uploadMedia } from "./utils/cloudinary.js";

dotenv.config({});

// call database connection here
connectDB();
const app = express();

// Webhook route phải được xử lý trước khi parse JSON
app.use((req, res, next) => {
    if (req.originalUrl === '/api/v1/purchase/webhook') {
        next();
    } else {
        express.json()(req, res, next);
    }
});

app.post("/api/v1/purchase/webhook", express.raw({ type: 'application/json' }));

app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));

// apis
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);
app.use("/api/v1/comments", commentRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/video", videoRoutes);

const PORT = process.env.PORT || 8080;

console.log(uploadMedia);

app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
});


