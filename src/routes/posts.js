import express from "express";

import ImageKit from 'imagekit';

import multer from 'multer';


import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controller/posts.js";

// import multer from "multer";

import authMiddleware from '../controller/authMiddleware.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads');  // Folder for storing uploaded images
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + file.originalname);  // Unique file name
//   },
// });

// const upload = multer({ storage });  // Multer middleware for handling file uploads


// Create a new Router object
const router = express.Router();

// Define routes for various HTTP methods and their corresponding functions
router.get("/", getPosts); // Get all posts
router.get("/:id", getPost); // Get a specific post by its ID
router.post("/", upload.single('image'), addPost); // Add a new post
router.delete("/:id", deletePost); // Delete a post by its ID
router.put("/:id", updatePost); // Update a post by its ID

export default router;
