import { body } from 'express-validator';

export const validateRegistration = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('username cannot be empty'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),

];


export const validateLogin = [

  body('email').isEmail().withMessage('Invalid email address'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),

];

export const validateAddProduct = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string"),


  body("category")
    .optional()
    .trim()
    .isString()
    .withMessage("category must be a string"),


  body("price")
    .isFloat({ gt: 0 })
    .withMessage("price must be a positive number"),


  body("quantity")
    .isInt({ min: 0 })
    .withMessage("quantity must be a non-negative integer"),
];


export const validateUpdateProduct = [

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string"),


  body("category")
    .optional()
    .trim()
    .isString()
    .withMessage("category must be a string"),


  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("price must be a positive number"),


  body("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("quantity must be a non-negative integer"),

];


