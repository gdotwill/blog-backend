import express from "express";
import authRoutes from "./src/routes/auth.js";
import postRoutes from "./src/routes/posts.js";
import usersRoutes from "./src/routes/users.js";
import userRoutes from "./src/routes/user.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authMiddleware from './src/controller/authMiddleware.js'; 
import pool from './src/db.js'; 
import bodyParser from 'body-parser';
import multer from 'multer';

const app = express();

// Set up Multer to handle file uploads in memory
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max 10MB file size limit
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(fileUpload({ 
//   createParentPath: true,  // Create parent directories if they don't exist
//   limits: { fileSize: 50 * 1024 * 1024 }  // Set limit for file size (e.g., 50MB)
// }));  // Add file upload middleware here

const allowedOrigins = ['http://localhost:3001', 'https://blog-woad-three-52.vercel.app'];

const corsOptions = {
  origin: allowedOrigins, 
  credentials: true,  
};

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


const port = process.env.PORT || 3000;

app.use(cors(corsOptions)); 

app.use(express.json());

app.use(express.urlencoded({ extended: true })); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", usersRoutes);
// app.use("/api/user", userRoutes);

app.get('/', (req,res) => {
  res.send('Hello')
})

app.get('/api/user', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;  // Extract user ID from decoded token
    const result = await pool.query('SELECT id, username FROM users WHERE id = $1', [userId]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

app.listen(port, () => {
  console.log("Connected...");
});

export default app;











// app.use(cors());

// app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Allow React to talk to the server


// const corsOptions = {
//   origin: 'http://localhost:3000/api/auth/login',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
//   optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions));  // Use cors middleware

// app.use(cors());

// app.use(cors({
//   origin: true,
//   methods: 'GET, POST, OPTIONS, PUT, DELETE, PATCH',
//   allowedHeaders: 'Origin, Content-Type, Accept, Authorization, X-Request-With, Content-Range, Content-Disposition, Content-Description',
//   credentials: true 
// }));

// app.use(cors({ origin: 'http://localhost:3000/api/auth/login', credentials: true })); // Allow React to talk to the server
// app.use(cors({ origin: 'http://localhost:3000/auth/login', credentials: true })); // Allow React to talk to the server
// app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Allow React to talk to the server


// const corsOptions ={
//   origin:'http://localhost:3000/api/auth/login', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }
// app.use(cors(corsOptions));
