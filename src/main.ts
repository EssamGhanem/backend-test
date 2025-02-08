import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();
app.use(express.json()); 

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});





// Routes group
import authRouter from "./routes/auth";
import productRouter from "./routes/product"
app.use('/api/auth',authRouter);
app.use('/api/products',productRouter);















const connectDB = () => {
  process.env.DB_URL && mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));
}



app.listen(PORT, () => {
  connectDB()
  console.log(`Server running on http://localhost:${PORT}`);
});