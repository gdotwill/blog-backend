import express from "express";
import authRoutes from "./src/routes/auth.js";
import postRoutes from "./src/routes/posts.js";
import userRoutes from "./src/routes/users.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";

// Create an instance of the Express application
const app = express();

const port = process.env.PORT || 3000;

// Use the built-in JSON middleware to parse incoming requests
app.use(express.json());
// Use the cookieParser middleware to parse cookies from incoming requests
app.use(cookieParser());

app.use(cors());

app.use(cors({
  origin: true,
  methods: 'GET, POST, OPTIONS, PUT, DELETE, PATCH',
  allowedHeaders: 'Origin, Content-Type, Accept, Authorization, X-Request-With, Content-Range, Content-Disposition, Content-Description',
  credentials: true 
}));

// Configuration object for setting destination and filename for the uploaded file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder where the uploaded file should be stored
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    // Set the filename of the uploaded file
    cb(null, Date.now() + file.originalname);
  },
});

// Set up multer middleware with the defined storage configuration
const upload = multer({ storage });

// Set up a POST endpoint for handling file uploads
app.post("/api/upload", upload.single("file"), function (req, res) {
  // Get the uploaded file
  const file = req.file;
  // Send a response with the filename of the uploaded file
  res.status(200).json(file.filename);
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

app.get('/', (req,res) => {
  res.send('Hello')
})

// Start the server and listen on port 3000
app.listen(port, () => {
  console.log("Connected...");
});

export default app;
