import express from "express";
import {
  getUsers
} from "../controller/users.js";

// Create a new Router object
const router = express.Router();

// Define routes for various HTTP methods and their corresponding functions
router.get("/", getUsers); 


export default router;
