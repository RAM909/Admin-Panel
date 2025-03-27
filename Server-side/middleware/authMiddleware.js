import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// const protect = asyncHandler(async (req, res, next) => {
//   let token;
//   console.log(req.cookies.token);

//   // Check if token is in cookies
//   if (req.cookies && req.cookies.token) {
//     try {
//       token = req.cookies.token;

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select("-password");

//       next();
//     } catch (error) {
//       res.status(401);
//       throw new Error("Not authorized, invalid token");
//     }
//   } else {
//     res.status(401);
//     throw new Error("Not authorized, no token");
//   }
// });

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    console.log(req.body);
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

const admin = asyncHandler(async (req, res, next) => {
  if (
    req.user &&
    (req.user.role === "admin" || req.user.role === "superadmin")
  ) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
});

export { authenticateToken, admin };
