import Appointment from "../models/Appointment.js";

export const analyzeUserTimes = async (userId) => {
  const data = await Appointment.find({ user_id: userId });

  if (data.length === 0)
    return "لا توجد بيانات كافية لإجراء التحليل.";

  const hours = data.map(x =>
    new Date(x.appointment_datetime).getHours()
  );

  const commonHour = hours.sort(
    (a, b) =>
      hours.filter(v => v === a).length -
      hours.filter(v => v === b).length
  ).pop();

  return `أفضل وقت للتذكير هو ${commonHour}:00 بناءً على عاداتك السابقة.`;
};
