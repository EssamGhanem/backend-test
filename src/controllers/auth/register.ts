import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../../models/User";
import {  validationResult } from 'express-validator';

export const register = async (req: Request, res: Response) => {

  try {

   const errors=  validationResult(req);

   if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return ;
  }


    console.log(req.body);
    const { name, email, password } = req.body;


    const existingUser = await User.findOne({ email });
    if (existingUser) {
       res.status(400).json({ message: "User already exists" });
       return;
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();


   res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

    return;

  } catch (err) {
    console.error("Error in Registration :", err);
    res.status(500).json({ message: "Internal Server Error", err });
    return;
  }
}