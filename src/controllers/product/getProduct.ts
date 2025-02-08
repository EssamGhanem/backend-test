import { Request, Response } from "express";
import Product from "../../models/Product";



export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find the product by ID
    const product = await Product.findById(id);

    if (!product) {
       res.status(404).json({ message: "Product not found" });
       return;
    }

    // Return the product
     res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
    return;
  } catch (err) {
    console.error("Error fetching product:", err);
     res.status(500).json({ message: "Internal Server Error", err });
     return;
  }
};