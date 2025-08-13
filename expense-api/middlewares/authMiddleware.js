import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // GUARDAR el usuario aquí
    req.session = {
      token,
      expiresAt: decoded.exp * 1000,
      expiresIn: decoded.exp - decoded.iat,
    };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid Token" });
  }
};

export default authMiddleware;
