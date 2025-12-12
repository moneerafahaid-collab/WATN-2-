import mongoose from "mongoose";
import fs from "fs";
import Appointment from "./models/Appointment.js";

mongoose.connect("mongodb://localhost:27017/watn")
  .then(() => console.log("✅ Connected to Local MongoDB"))
  .catch((err) => console.log("❌ DB Error:", err));

const data = JSON.parse(fs.readFileSync("appointments.json", "utf8"));

async function importData() {
  await Appointment.insertMany(data);
  console.log("✅ Imported Successfully");
  process.exit();
}

importData();
