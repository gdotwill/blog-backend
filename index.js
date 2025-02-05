import express from "express";
import authRoutes from "./src/routes/auth.js";
import postRoutes from "./src/routes/posts.js";
import usersRoutes from "./src/routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authMiddleware from './src/controller/authMiddleware.js'; // Import the middleware
import pool from './src/db.js'; 
import bodyParser from 'body-parser';

// Create an instance of the Express application
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3001',  // Frontend URL
  credentials: true,  // Allow cookies and authorization headers
};

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


const port = process.env.PORT || 3000;

app.use(cors(corsOptions)); 

app.use(express.json());

app.use(express.urlencoded({ extended: true }));  // To parse URL-encoded request bodies


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cookieParser());

app.use('/uploads', express.static('uploads')); // Serve uploaded images

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", usersRoutes);

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

// Start the server and listen on port 3000
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
