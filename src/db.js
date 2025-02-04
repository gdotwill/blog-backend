// import { Pool } from 'pg';
import pg from 'pg';
const { Pool, Client } = pg;

import dotenv from 'dotenv';
dotenv.config();


// PostgreSQL connection pool using connection string
const pool = new Pool({
  connectionString: process.env.PG_URL, // Use connection string from .env file
  ssl: {
    rejectUnauthorized: false, // Set this to true if you have an SSL-enabled DB connection
  },
});

export default pool;
