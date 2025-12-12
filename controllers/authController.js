import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// تسجيل مستخدم جديد (مرة واحدة فقط)
export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  // تشفير كلمة المرور
  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hashed
  });

  res.json({ message: "✅ User Registered", user });
};

// تسجيل login وإصدار token
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) return res.status(401).json({ message: "❌ المستخدم غير موجود" });

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) return res.status(401).json({ message: "❌ كلمة المرور خاطئة" });

  // إصدار توكن JWT
  const token = jwt.sign({ id: user._id }, "WATN_SECRET_KEY", { expiresIn: "1d" });

  res.json({ message: "✅ Login Success", token });
};
