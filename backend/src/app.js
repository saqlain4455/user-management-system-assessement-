import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: false
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