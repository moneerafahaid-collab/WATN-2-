import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ message: "توكن مفقود" });

  const token = header.split(" ")[1];

  try {
    jwt.verify(token, "WATN_SECRET_KEY");
    next();
  } catch (err) {
    return res.status(401).json({ message: "توكن غير صالح" });
  }
};
