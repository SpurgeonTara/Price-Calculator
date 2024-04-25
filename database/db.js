import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  host: process.env.dbHost,
  user: process.env.dbUser,
  database: process.env.dbName,
  password: process.env.dbPassword,
  port: process.env.dbPort,
  // ssl: true,
});

export default pool;
