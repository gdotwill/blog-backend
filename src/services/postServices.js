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

export const addPost = async(id, title, description, cat) => {
    if (!title || !description || !cat) {
        throw { status: 400, message: 'Title and description are required.' };
    }
    
    const result = await pool.query(
    'INSERT INTO blogs (id, title, description, cat, img) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [id, title, description, cat, img]
    );
    console.log("ZZ", result)

    return result.rows[0];  // Return the newly created blog

}



// const q = req.query.cat
// ? "SELECT * FROM posts WHERE cat=?"
// : "SELECT * FROM posts";


// await pool.query(q, [req.query.cat], (err, data) => {

// if (err) return res.status(500).send(err);

// return res.status(200).json(data);


