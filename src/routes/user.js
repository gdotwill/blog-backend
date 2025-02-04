import express from "express";
import {
  getUser
} from "../controller/user.js";

// Create a new Router object
const router = express.Router();

// Define routes for various HTTP methods and their corresponding functions
router.get("/", getUser); 


export default router;
