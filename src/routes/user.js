import express from "express";
import {
  getUser
} from "../controller/user.js";

import authMiddleware from '../controller/authMiddleware.js'; // Import the middleware

// Create a new Router object
const router = express.Router();

// Define routes for various HTTP methods and their corresponding functions
router.get("/", authMiddleware, getUser); 


export default router;
