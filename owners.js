
// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getOwners() {
  // Define the SQL query to fetch all owners from the 'owners' table
  const queryText = `SELECT * FROM owners`;

  // Use the pool object to send the query to the database
  const result = await pool.query(queryText);

  // The rows property of the result object contains the retrieved records
  return result.rows;
}

export async function getOwnersById(id) {
  // Define the SQL query to fetch an owner with the given ID
  const queryText = `SELECT * FROM owners WHERE id = $1`;

  // Use the pool object to send the query to the database and pass the ID as a parameter
  const result = await pool.query(queryText, [id]);

  // Return the first row if found, otherwise null
  return result.rows[0] || null;
}

export async function createOwners(resource) {
  const { name, address } = resource;
  
  // Define the SQL query to insert a new owner
  const queryText = `INSERT INTO owners(name, address)
                     VALUES($1, $2) RETURNING *`;

  // Prepare the values array
  const values = [name, address];

  // Execute the query and return the newly created owner
  const result = await pool.query(queryText, values);
  return result.rows[0];
}

export async function updateOwnersById(id, updates) {
  const { name, address } = updates;

  // Define the SQL query to update an owner
  const queryText = `UPDATE owners SET name = $1, address = $2
                     WHERE id = $3 RETURNING *`;

  // Prepare the values array, including the ID at the end
  const values = [name, address, id];

  try {
    // Execute the query and return the updated owner
    const result = await pool.query(queryText, values);
    return result.rows[0] || null;
  } catch (err) {
    console.error('Database update error:', err);
    throw new Error('Database update failed');
  }
}

export async function deleteOwnersById(id) {
  // Define the SQL query to delete an owner with the given ID
  const queryText = `DELETE FROM owners WHERE id = $1 RETURNING *`;

  try {
    // Execute the query and return the deleted owner
    const result = await pool.query(queryText, [id]);
    return result.rows[0] || null;
  } catch (err) {
    console.error('Database delete error:', err);
    throw new Error('Database delete failed');
  }
}

