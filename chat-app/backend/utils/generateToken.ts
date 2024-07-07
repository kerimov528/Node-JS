import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, // Prevents client JS from reading the cookie
    secure: process.env.NODE_ENV !== "development", // Ensures the cookie is only sent over HTTPS
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "strict", //CSRF
  });

  return token;
};

export default generateToken;
