import { pool } from "../index.js";



// >>> MAKE SURE YOU UNDERSTAND THIS FILE AND WHAT IT'S DOING <<<
// >>> FEEL FREE TO CHANGE IT TO MAKE YOUR OWN RESOURCES (TABLES AND PROPERTIES) - YOU DON'T HAVE TO USE ALBUMS AND ARTISTS <<<



async function resetDatabase() {
  try {
    // Drop existing tables if they exist
    await pool.query(`
        DROP TABLE IF EXISTS cars CASCADE;
        DROP TABLE IF EXISTS owners CASCADE;
    `);

    // Create the owners table
    await pool.query(`
        CREATE TABLE owners  (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) 
        );
    `);

    // Create the cars table with a foreign key to the owners table
    await pool.query(`
        CREATE TABLE cars  (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            make VARCHAR(255) NOT NULL,
            model VARCHAR(255) NOT NULL,
            Year INT NOT NULL,
            owner_id INT REFERENCES owners(id)
        );
    `);

    // Seed the owners table
    await pool.query(`
        INSERT INTO owners (name, address)
        VALUES 
            ('Caron Lipa', '1234 Main ST'),
            ('Sam Smith', '567 Main CT');
    `);

    // Seed the cars table
    await pool.query(`
        INSERT INTO cars (make, model, year, owner_id)
        VALUES 
            ('Toyota', 'Camry', 2020, 1),
            ('Honda', 'Accord', 2018, 2),
            ('Ford', 'Focus', 2021, 1),
            ('Tesla', 'Model S', 2021, 2);
    `);

    console.log("Database reset successful");
  } catch (error) {
    console.error("Database reset failed: ", error);
  } finally {
    // End the pool
    await pool.end();
  }
}

await resetDatabase();
