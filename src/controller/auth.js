// import pool from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from '../db.js'; 

// Register a new user
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user exists
  const existingUserQuery = 'SELECT * FROM users WHERE email = $1';
  const existingUserResult = await pool.query(existingUserQuery, [email]);

  if (existingUserResult.rows.length > 0) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert new user into database
  const insertQuery = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
  try {
    const result = await pool.query(insertQuery, [username, email, hashedPassword]);
    const user = result.rows[0];

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      token,
      user: { username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'username and password are required.' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};

// Logout user
export const logout = (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Assuming the token is sent in the Authorization header
  
  // Optionally, you could add the token to a blacklist (e.g., in a database or in-memory cache)
  if (token) {
    // Save the token in a blacklist (example: Redis or database)
    // Example: redisClient.set(token, 'blacklisted');
    
    res.json({ message: 'Logged out successfully' });
  } else {
    res.status(400).json({ message: 'No token provided' });
  }
};



