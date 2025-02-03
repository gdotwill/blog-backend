import { query } from "../db.js";

export const getPosts = async() => {
    try {
        const {rows} = await query('SELECT * FROM posts');
        // console.log('BBBBBB', rows)
        return rows;
        
    } catch (error) {
        console.log('NO USER', error)
        
    }

}

// const q = req.query.cat
// ? "SELECT * FROM posts WHERE cat=?"
// : "SELECT * FROM posts";


// await query(q, [req.query.cat], (err, data) => {

// if (err) return res.status(500).send(err);

// return res.status(200).json(data);


