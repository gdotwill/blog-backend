import pool from "../db.js";
import jwt from "jsonwebtoken";
import * as postService from "../services/postServices.js";


import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});


export const getPosts = async (req, res) => {
  try {
      const posts = await postService.getPosts();
      res.status(200).json(posts);
  } catch (err) { 
      console.error('Error fetching users:', err);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;  // Get the ID from the URL parameter

  console.log('Request Params:', req.params);
  

  try {
    console.log('Fetching post with ID:', id); 
    const post = await postService.getPost(id);

    console.log("K", post)

    if (!post) {
      return res.status(404).json({ error: 'Post not found.' });
    }

    return res.status(200).json(post);  // Return the post data
  } catch (err) {
    console.error('Error fetching post:', err);
    console.log("NLLLL")
    return res.status(500).json({ error: 'Error retrieving post.' });
  }
};

export const addPost = async (req, res) => {

  console.log("FILES", req.files);  // Log the files to check if they're being received properly

  const { title, description, category } = req.body;

  const imageFile = req.file;

  // const image = req.files?.image; // Use express-fileupload middleware to access the file

  // if (!image) {
  //   console.log("No image uploaded")
  //   return res.status(400).json({ message: 'No image uploaded' });
  // }

  try {

    const imagekitResponse = await imagekit.upload({
      file: imageFile.buffer,  // Image file buffer
      fileName: Date.now() + '_' + imageFile.originalname,  // Unique file name
      folder: '/posts/',  // Optional: folder in ImageKit
    });

    const imageUrl = imagekitResponse.url;

    const newBlog = await postService.addPost(title, description, category, imageUrl);
    res.status(201).json({ message: 'Blog created successfully!', blog: newBlog });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};


// Adds a new post to the database
// export const addPost = (req, res) => {
//   // Check if the user is authenticated by checking for a token in the cookies
//   const token = req.cookies.access_token;
//   if (!token) return res.status(401).json("Not authenticated!");

//   // Verify the token using the secret key
//   jwt.verify(token, "jwtkey", (err, userInfo) => {
//     // If there's an error, the token is not valid
//     if (err) return res.status(403).json("Token is not valid!");

//     // Otherwise, construct the SQL query to insert a new post into the database
//     const q =
//       "INSERT INTO posts(`title`, `description`, `date`,`uid`) VALUES (?)";

//     // Define an array of values to be inserted into the database, including the
//     // post data from the request body and the user ID from the decoded token
//     const values = [
//       req.body.title,
//       req.body.description,
//       // req.body.img,
//       // req.body.cat,
//       req.body.date,
//       userInfo.id,
//     ];

//     // Use the database object to execute the SQL query with the values array
//     query(q, [values], (err, data) => {
//       // If there's an error, return a 500 status code and the error message
//       if (err) return res.status(500).json(err);

//       // Otherwise, return a 200 status code and a success message
//       return res.json("Post has been created.");
//     });
//   });
// };

// Deletes a post from the database
export const deletePost = (req, res) => {
  // Check if the user is authenticated by checking for a token in the cookies
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  // Verify the token using the secret key
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    // If there's an error, the token is not valid
    if (err) return res.status(403).json("Token is not valid");

    // Otherwise, get the ID of the post to be deleted from the request parameters
    const postId = req.params.id;

    // Construct an SQL query to delete the post with the specified ID, but only if
    // the user ID associated with the post matches the ID of the authenticated user
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    // Execute the SQL query with the postId and userInfo.id as parameters
    query(q, [postId, userInfo.id], (err, data) => {
      // If there's an error, return a 403 status code and an error message
      if (err) return res.status(403).json("You can delete only your post");

      // Otherwise, return a 200 status code and a success message
      return res.json("Post has been deleted");
    });
  });
};

// Update a post
export const updatePost = (req, res) => {
  // Get the access token from the request cookies.
  const token = req.cookies.access_token;

  // Check if the token exists, if not, return an error response.
  if (!token) return res.status(401).json("Not authenticated!");

  // Verify the token using the "jwtkey" secret key. If the token is not valid, return an error response.
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // Get the post ID from the request parameters.
    const postId = req.params.id;

    // SQL query to update the post with new values.
    const q =
      "UPDATE posts SET `title`=?,`description`=?,`img`=?,`category`=? WHERE `id` = ? AND `uid` = ?";

    // An array containing the new values for the post.
    const values = [req.body.title, req.body.description, req.body.img, req.body.category];

    // Execute the query using the values and post ID. If there's an error, return an error response. Otherwise, return a success response.
    query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
};
