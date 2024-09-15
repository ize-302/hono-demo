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
    await sql`
      CREATE TABLE IF NOT EXISTS tasks (
        id serial PRIMARY KEY,
        name text NOT NULL,
        status boolean DEFAULT false,
        createdAt timestamptz DEFAULT CURRENT_TIMESTAMP
      );
    `
    await sql.end()
    process.exit()
  } catch (error) {
    console.log(error)
  }
}

createTable()

module.exports = sql