import { Request, Response } from "express";
import Product from "../../models/Product";

export const getAllProducts = async (req: Request, res: Response) => {
  try {



    let { page } = req.query;
    let products ;
    console.log(page)
    if(page){
      const limit = 2; // Number of products per page
      const pageNumber = parseInt(page as string) || 1;
      const skip = (pageNumber - 1) * limit;
  
       products = await Product.find().limit(limit).skip(skip);
  
    }
    else{
      products = await Product.find();
    }


     res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
    return;
    
  } catch (err) {
    console.error("Error fetching products:", err);
     res.status(500).json({ message: "Internal Server Error", err });
     return;
  }
};