import { Request, Response } from "express";
import Product from "../../models/Product";
import { validationResult } from "express-validator";

export const addProduct = async (req: Request, res: Response) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(400).json({ errors: errors.array() });
       return;
    }

    const { name, category, price, quantity } = req.body;


    const newProduct = new Product({
      name,
      category,
      price,
      quantity,
    });


    await newProduct.save();

     res.status(201).json({
      message: "product added successfully",
      product: newProduct,
    });

    return;
  } catch (err) {
    console.error("error adding product:", err);
     res.status(500).json({ message: "internal server error", err });

     return;
  }
};