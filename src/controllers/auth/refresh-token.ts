import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../models/User";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '37d62a4bdf512b53f7e24c96941d6acf186e183bcc1ee5c0e84ef8a842eb74e4';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '37d62a4bdf512b53f7e24c96941d6acf186e183bcc1ee5c0e84ef8a842eb74e4';
const ACCESS_TOKEN_EXPIRY = "15m";

interface DecodedToken {
  id: string;
  name:string;
  email: string;
  role: string;
}

export const refreshToken = async (req: Request, res: Response) => {
  try {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(401).json({ message: "No refresh token provided" });
      return;
    }


    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as DecodedToken;


    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // generate a new access token
    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );


    res.status(200).json({
      message: "Access token refreshed",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
    return;

  } catch (err) {
    console.error("Error refreshing token:", err);


    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Refresh token expired" });
      return;
    } else if (err instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid refresh token" });
      return
    }

    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};