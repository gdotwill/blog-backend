import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Rottenapple1",
  database: "blog_app",
});

console.log('DB', db)
