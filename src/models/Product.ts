import mongoose, { Schema, Document } from "mongoose";


interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, optional:true },
    price: { type: Number, required: true , min:0 },
    quantity: { type: Number, required: true , min:0},
  },
  { timestamps: true } 
);


export default mongoose.model<IProduct>("Product", ProductSchema);