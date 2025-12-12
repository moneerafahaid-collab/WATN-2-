import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  appointment_type: { type: String, required: true },
  appointment_datetime: { type: Number, required: true },
  location: { type: String, required: true }
}, {
  timestamps: true
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

export default Appointment;
