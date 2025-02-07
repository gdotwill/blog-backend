import pool from "../db.js";

export const getPosts = async() => {
    try {
        const {rows} = await pool.query('SELECT * FROM posts');
        // console.log('BBBBBB', rows)
        return rows;
        
    } catch (error) {
        console.log('NO USER', error)
        
    }

}

export const getPost = async(id) => {
    const query = 'SELECT * FROM posts WHERE id = $1';

    try {   
        console.log('Executing query with ID:', id);   
        const result = await pool.query(query, [id]);
        console.log("AA", result)
        return result.rows[0];  // Return the first ma
        
    } catch (error) {
        console.log('NO USER', error)
        
    }

}

export const addPost = async(title, description, category, imageUrl) => {
    const query = `
        INSERT INTO posts (title, description, category, img)
        VALUES ($1, $2, $3, $4)
        RETURNING *; 
    `;

    try {
        const result = await pool.query(query, [title, description, category, imageUrl]);
        // console.log('TP', result.rows[0]; 
        return result.rows[0]; 
    } catch (err) {
        console.error('Error saving post:', err);
        throw err;  // Propagate error to controller
    }

}



// const q = req.query.cat
// ? "SELECT * FROM posts WHERE category=?"
// : "SELECT * FROM posts";


// await pool.query(q, [req.query.category], (err, data) => {

// if (err) return res.status(500).send(err);

// return res.status(200).json(data);


