require('dotenv').config();
const postgres = require('postgres');

const sql = postgres({
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  ssl: "require",
})


// Create tasks table
const createTable = async () => {
  try {
    const [result] = await sql`
      SELECT EXISTS (
        SELECT 1 
        FROM pg_catalog.pg_tables 
        WHERE schemaname = 'public'
        AND tablename = 'tasks'
      );
    `;
    if (!result.exists) {
      await sql`
        CREATE TABLE IF NOT EXISTS tasks (
          id serial PRIMARY KEY,
          name text NOT NULL,
          status boolean DEFAULT false,
          createdAt timestamptz DEFAULT CURRENT_TIMESTAMP
        );
      `
    }
  } catch (error) {
    console.log(error)
  }
}

createTable()

module.exports = sql