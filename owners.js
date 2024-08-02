
// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getOwners() {
  // Query the database and return all resource twos
   // Define the SQL query to fetch all cars from the 'cars' table
   const queryText = `SELECT * FROM owners`

   // Use the pool object to send the query to the database
   const result = await pool.query(queryText);
 
 // The rows property of the result object contains the retrieved records
   return result.rows;
}

export async function getOwnersById(id) {
  // Query the database and return the resource with a matching id or null

  const queryText = `SELECT * FROM owners WHERE ID = $1`;

  // Use the pool object to send the query to the database and passing the id as a parameter to prevent SQL injection
  const result = await pool.query(queryText, [id])

  return result.rows[0] || null;
}

export async function createOwners(resource) {
  // Query the database to create an resource and return the newly created resource
  const queryText = `INSERT INTO owners(name, email) VALUES($1, $2) RETURNING *`;
}

export async function updateOwnersById(id, updates) {
  // Query the database to update the resource and return the newly updated resource or null
}

export async function deleteOwnersById(id) {
  // Query the database to delete the resource and return the deleted resource or null
}