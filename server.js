// =========================
// 📌 Imports
// =========================
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import appointmentRoutes from "./routes/appointmentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

// =========================
// 📌 Fix __dirname for ES Modules
// =========================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =========================
// 📌 Create Server
// =========================
const app = express();
app.use(cors());
app.use(express.json());

// =========================
// 📌 Serve Frontend (public folder)
// =========================
app.use(express.static(path.join(__dirname, "public")));

// =========================
// 📌 API Routes
// =========================
app.use("/api/auth", authRoutes);
app.use("/api/appointments", authMiddleware, appointmentRoutes);

// =========================
// 📌 Redirect root "/" → index.html
// =========================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// =========================
//📌 Start Server
// =========================
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
