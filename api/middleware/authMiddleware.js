import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalid or expired" });
  }
};
