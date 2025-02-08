import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from "../../models/User";
import { validationResult } from "express-validator";


const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '37d62a4bdf512b53f7e24c96941d6acf186e183bcc1ee5c0e84ef8a842eb74e4';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '37d62a4bdf512b53f7e24c96941d6acf186e183bcc1ee5c0e84ef8a842eb74e4';
const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "10d";

export const login = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;


    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    // Generate access token
    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role:user.role },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: user._id, email: user.email, role:user.role },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRY }
    );

    // Set refresh token in an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });


    res.status(200).json({
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role:user.role
      },
    });

    return;

  } catch (err) {
    console.error("Error in Login:", err);
    res.status(500).json({ message: "Internal Server Error", err });
    return;
  }
};