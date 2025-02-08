import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define environment variable for JWT secret
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "37d62a4bdf512b53f7e24c96941d6acf186e183bcc1ee5c0e84ef8a842eb74e4";

// Define a custom interface for the decoded JWT payload
interface DecodedToken {
  id: string;
  name:string;
  email: string;
  role: string;
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
       res.status(401).json({ message: "Unauthorized: No token provided" });
       return;
    }

    const accessToken = authHeader.split(" ")[1]; // Extract the token

    
    const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as DecodedToken;

    // Check if the user has the admin role
    if (decoded) {
      res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
      return ;
    }


    next();

  } catch (err) {
    console.error("Error in authorization middleware:", err);
     res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
     return;
  }
};