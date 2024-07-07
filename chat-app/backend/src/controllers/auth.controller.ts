import { Request, Response } from "express";
import prisma from "../db/prisma";
import bcrypt from "bcryptjs";
import generateToken from "../../utils/generateToken";

export const login = (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    prisma.user
      .findUnique({ where: { username } })
      .then((user) => {
        if (!user) {
          return res.status(400).json({ message: "User does not exist" });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            throw err;
          }

          if (isMatch) {
            generateToken(user.id, res);
            res.status(200).json({ message: "Login successful" });
          } else {
            res.status(400).json({ message: "Invalid credentials" });
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    if (!fullname || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and Confirm Password must match" });
    }

    const user = await prisma.user.findUnique({ where: { username } });

    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await prisma.user.create({
      data: {
        fullname,
        username,
        password: hashedPassword,
        gender,
        profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
      },
    });

    if (newUser) {
      generateToken(newUser.id, res);
      res.status(200).json({ message: "User created successfully" });
    } else {
      res.status(400).json({ message: "User creation failed" });
    }
  } catch (error) {
    console.error(error);
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logout successful" });
};
