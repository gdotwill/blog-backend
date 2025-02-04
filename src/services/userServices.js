import pool from "../db.js";

export const getUsers = async(req,res) => {
    try {
        const userId = req.user.id;  // Extract user ID from decoded token
        const result = await pool.query('SELECT id, email FROM users WHERE id = $1', [userId]);
        const user = result.rows[0];

        console.log("user", user)
    
        if (!user) {
          return res.status(404).json({ message: 'User not found.' });
        }
    
        res.json({ user });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong. Please try again.' });
      }

}


