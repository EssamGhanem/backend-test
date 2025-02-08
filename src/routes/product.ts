import express from "express"
import { addProduct } from "../controllers/product/addProduct";
import { updateProduct } from "../controllers/product/updateProduct";
import { deleteProduct } from "../controllers/product/deleteProduct";
import { getAllProducts } from "../controllers/product/getAllProducts";
import { getProductById } from "../controllers/product/getProduct";
import { requireAdmin } from "../middleware/adminAuthorization ";
import { validateAddProduct, validateUpdateProduct } from "../utils/validations";

const Router = express.Router();






Router.route('/').post(requireAdmin, validateAddProduct, addProduct).get(getAllProducts)
Router.route('/:id')
  .put(requireAdmin, validateUpdateProduct, updateProduct)
  .delete(requireAdmin, deleteProduct)
  .get(getProductById)


export default Router;