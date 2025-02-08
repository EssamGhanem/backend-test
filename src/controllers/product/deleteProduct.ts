import { Request, Response } from "express";
import Product from "../../models/Product";
import { validationResult } from "express-validator";


export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
       res.status(404).json({ message: "Product not found" });
       return;
    }

   
     res.status(200).json({ message: "Product deleted successfully" });
     return;

  } catch (err) {
    console.error("Error deleting product:", err);
     res.status(500).json({ message: "Internal Server Error", err });
     return;
  }
};