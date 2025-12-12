import Appointment from "../models/Appointment.js";

// جلب كل المواعيد
export const getAllAppointments = async (req, res) => {
  const data = await Appointment.find();
  res.json(data);
};

// جلب مواعيد مستخدم
export const getUserAppointments = async (req, res) => {
  const id = parseInt(req.params.id);
  const data = await Appointment.find({ user_id: id });
  res.json(data);
};

// البحث عن موعد
export const searchAppointments = async (req, res) => {
  const q = req.params.q;
  const data = await Appointment.find({
    appointment_type: { $regex: q, $options: "i" },
  });
  res.json(data);
};

// جلب حسب نوع الخدمة
export const getByType = async (req, res) => {
  const type = req.params.type;
  const data = await Appointment.find({ appointment_type: type });
  res.json(data);
};

// إضافة موعد جديد
export const addAppointment = async (req, res) => {
  try {
    const newApp = await Appointment.create(req.body);
    res.json(newApp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// تحديث موعد
export const updateAppointment = async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// حذف موعد
export const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "🗑️ Deleted Successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// === دالة الذكاء الاصطناعي ===
export const aiSuggest = async (req, res) => {
  const userId = req.params.user_id;

  const data = await Appointment.find({ user_id: userId });

  if (data.length === 0) {
    return res.json({
      suggestion: "لا توجد مواعيد كافية لتقديم تحليل.",
    });
  }

  const hours = data.map((x) =>
    new Date(x.appointment_datetime).getHours()
  );

  const commonHour = hours
    .sort(
      (a, b) =>
        hours.filter((v) => v === a).length -
        hours.filter((v) => v === b).length
    )
    .pop();

  res.json({
    suggestion: `أفضل وقت مناسب لك لتذكير المواعيد هو الساعة ${commonHour}:00 بناءً على تحليل نشاطك السابق.`,
  });
};
