// import env from "dotenv"
// env.config();

// import mysql from "mysql2";

// export const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Rottenapple1",
//   database: "blog_app",
// });

// console.log('DB', db)

import env from "dotenv"
env.config();

import pg from 'pg'
const { Pool, Client } = pg

const connectionString = process.env.PG_URL
 
const pool = new Pool({
  connectionString
})
 
// console.log("DB", await pool.query('SELECT * from staff'))
 
const db = new Client({
  connectionString
})

await db.connect()
 
// console.log(await db.query('SELECT * from staff'))

export const dbs = (text, params) => db.query(text, params);
 
// await db.end()
