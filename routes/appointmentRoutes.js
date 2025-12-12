import express from "express";
import {
  getAllAppointments,
  getUserAppointments,
  getByType,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  searchAppointments,
  aiSuggest
} from "../controllers/appointmentController.js";

const router = express.Router();

router.get("/", getAllAppointments);
router.get("/user/:id", getUserAppointments);
router.get("/type/:type", getByType);
router.get("/search/:q", searchAppointments);

// 🧠 Route الذكاء الاصطناعي
router.get("/ai/suggest/:user_id", aiSuggest);

router.post("/", addAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export default router;
