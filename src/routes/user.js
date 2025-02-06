import express from "express";
import {
  getUser
} from "../controller/user.js";

import authMiddleware from '../controller/authMiddleware.js'; 

const router = express.Router();

router.get("/", getUser); 

export default router;
