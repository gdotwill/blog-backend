import { query } from "../db.js";

export const getUsers = async() => {
    try {
        const {rows} = await query('SELECT * FROM users');
        // console.log('BBBBBB', rows)
        return rows;
        
    } catch (error) {
        console.log('NO USER', error)
        
    }

}


