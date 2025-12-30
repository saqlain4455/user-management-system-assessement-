import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://user-management-system-assessement.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("CORS not allowed"));
  }
}));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.get("/", (req, res) => {
  res.send("API is running");
});
app.post("/test", (req, res) => {
  res.json({ message: "test works" });
});

export default app;