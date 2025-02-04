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

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(404).json('User not found');
    }

    const user = result.rows[0];

    // Check password
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json('Invalid credentials');
    }

    // Create JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

    // Send cookie with JWT
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None' });
    return res.status(200).json({ username: user.username, email: user.email });
  } catch (err) {
    console.error(err);
    return res.status(500).json('Server error');
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
