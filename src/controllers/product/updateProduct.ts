import { Request, Response } from "express";
import Product from "../../models/Product";
import { validationResult } from "express-validator";

export const updateProduct = async (req: Request, res: Response) => {
  
  
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(400).json({ errors: errors.array() });
       return;
    }

    const { id } = req.params;
    const { name, category, price, quantity } = req.body;

   
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, category, price, quantity },
      { new: true } 
    );

    if (!updatedProduct) {
       res.status(404).json({ message: "product not found" });
       return;
    }

   
     res.status(200).json({
      message: "product updated successfully...!",
      product: updatedProduct,
    });

    return;

  } catch (err) {
    console.error("error updating product:", err);
     res.status(500).json({ message: "internal Ssrver error", err });
     return;
  }
};