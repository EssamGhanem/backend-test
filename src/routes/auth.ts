import express from "express"
import { register } from "../controllers/auth/register";
import { validateRegistration , validateLogin } from "../utils/validations";
import { login } from "../controllers/auth/login";
const Router = express.Router();



Router.route('/register').post(validateRegistration ,register);
Router.route('/login').post(validateLogin ,login);



export default Router ;