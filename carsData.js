
// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

// Function to retrieve all cars
export async function getCars() {
  // Define the SQL query to fetch all cars from the 'cars' table
  const queryText = `SELECT * FROM cars`;

  // Use the pool object to send the query to the database
  const result = await pool.query(queryText);

  // The rows property of the result object contains the retrieved records
  return result.rows;
}

// Function to retrieve a car by ID
export async function getCarsById(id) {
  // Define the SQL query to fetch a car with the given ID
  const queryText = `SELECT * FROM cars WHERE id = $1`;

  // Use the pool object to send the query to the database and pass the ID as a parameter
  const result = await pool.query(queryText, [id]);

  // Return the first row if found, otherwise null
  return result.rows[0] || null;
}

// Function to create a new car
export async function createCars(resource) {
  const { make, model, year, owner_id } = resource;
  
  // Validate owner_id
  if (!await validateOwnerId(owner_id)) {
    throw new Error('Invalid owner_id: The owner does not exist.');
  }

  // Define the SQL query to insert a new car
  const queryText = `INSERT INTO cars(make, model, year, owner_id)
                     VALUES($1, $2, $3, $4) RETURNING *`;

  // Prepare the values array
  const values = [make, model, year, owner_id];

  // Execute the query and return the newly created car
  const result = await pool.query(queryText, values);
  return result.rows[0];
}

// Function to update a car by ID
export async function updateCarsById(id, updates) {
  const { make, model, year, owner_id } = updates;

  // Define the SQL query to update a car
  const queryText = `UPDATE cars SET make = $1, model = $2, year = $3, owner_id = $4
                     WHERE id = $5 RETURNING *`;

  // Prepare the values array including the ID at the end
  const values = [make, model, year, owner_id, id];

  try {
    // Execute the query and return the updated car
    const result = await pool.query(queryText, values);
    return result.rows[0] || null;
  } catch (err) {
    console.error('Database update error:', err);
    throw new Error('Database update failed');
  }
}

// Function to delete a car by ID
export async function deleteCarsById(id) {
  // Define the SQL query to delete a car with the given ID
  const queryText = `DELETE FROM cars WHERE id = $1 RETURNING *`;

  try {
    // Execute the query and return the deleted car
    const result = await pool.query(queryText, [id]);
    return result.rows[0] || null;
  } catch (err) {
    console.error('Database delete error:', err);
    throw new Error('Database delete failed');
  }
}

// Helper function to validate owner_id
async function validateOwnerId(owner_id) {
  // Define the SQL query to check if the owner_id exists
  const queryText = `SELECT 1 FROM owners WHERE id = $1 LIMIT 1`;

  // Execute the query
  const result = await pool.query(queryText, [owner_id]);

  // Return true if an owner exists with the given ID, otherwise false
  return result.rowCount > 0;
}
