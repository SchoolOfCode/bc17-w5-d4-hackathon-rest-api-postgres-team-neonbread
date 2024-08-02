// Import the required modules
import express from "express";



// Import your helper functions for your first resource here
import {
  getOwners,
  getOwnersById,
  createOwners,
  updateOwnersById,
  deleteOwnersById,
} from "./owners.js";


// Import your helper functions for your second resource here
import {
  getCars,
  getCarsById,
  createCars,
  updateCarsById,
  deleteCarsById,
} from "./carsData.js";



// Initialize the express app
const app = express();
// Retrieve the port number from environment variables
const PORT = process.env.PORT;

app.use(express.json()); // express.json() middleware is used to parse incoming JSON requests

// Resource One Route Handlers

// Endpoint to retrieve all <resource_one>
app.get("/", async function (req, res) {
  console.log("I'm alive");
  res.status(200).json("I'm alive!");
});
app.get("/Owners/", async function (req, res) {
    const owners = await getOwners();
    res.status(200).json({ status: 'success', payload: owners});
});

// Endpoint to retrieve a <resource_one> by id
app.get("/Owners/:id", async function (req, res) {
  try{
  const id = req.params.id;
  if(!id){
    res.status(404).json({status: 'error', error: 'Id not found'});
  }
  const owner = await getOwnersById(id);
  res.status(200).json({ status: 'success', payload: owner});
}
catch(error){
  res.status(400).json({status:error, error: error});
}
});

// Endpoint to create a new <resource_one>
app.post("/Owners/", async function (req, res) {
  try{
    const newOwner = req.body;
  const owner = await createOwners(newOwner);
  res.status(201).json({ status: 'sucess', payload: owner});
}
catch(error){
  res.status(400).json({status:error, error: error});
}

});

// Endpoint to update a specific <resource_one> by id
app.patch("/Owners/:id", async function (req, res) {
  try{
 const id = req.params.id;
 const updates = req.body;
 const owner = await updateOwnersById(id, updates);
 res.status(200).json({status: 'success', payload: owner});
  }
  catch(error){
    res.status(400).json({status: 'error', error: error});
  }
});

// Endpoint to delete a specific <resource_one> by id
app.delete("/Owners/:id", async function (req, res) {
  try{
const id =req.params.id;
const owner = await deleteOwnersById(id);

if(!owner || !id){
  res.status(404).json({status: 'error', error: 'Id not found'});
}
res.status(200).json({status:'success', payload: 'Remove a specific resource by its ID'});
  }
  catch(error){
    res.status(400).json({status: 'error', error: error });
  }
});

// Resource Two Route Handlers
// Endpoint to retrieve all <resource_twos>
app.get("/Cars/", async function (req, res) {
    const cars = await getCars();
    res.status(200).json({ status: "success", data: cars });
  });
  
  // Endpoint to retrieve a <resource_twos> by id
  app.get("/Cars/:id", async function (req, res) {
  try{ 
  const id =req.params.id;
  const car = await getCarsById(id);
  res.status(200).json({status: 'success', payload: car})
 }
  catch(error){
  res.status(400).json({status: 'error', error: error})
  }
  });
  
  // Endpoint to create a new <resource_twos>
  app.post("/Cars/", async function (req, res) {
    try{
    const newCar = req.body
    const car = await createCars(newCar);
    res.status(201).json({status: 'sucess', payload: car});
    }
    catch(error){
      res.status(400).json({status: 'error', error: error})
    }
  });
  
  // Endpoint to update a specific <resource_twos> by id
  app.patch("/Cars/:id", async function (req, res) {
    try{
      const id = req.params.id;
      const updateCar = req.body
      const car = await updateCarsById(id, updateCar);
      res.status(201).json({status: 'sucess', payload: car});
      }
      catch(error){
        res.status(400).json({status: 'error', error: error})
      }
  });
  
  // Endpoint to delete a specific <resource_twos> by id
  app.delete("/Cars/:id", async function (req, res) {
    try{
      const id = req.params.id;
      const car = await deleteCarsById(id);
      res.status(200).json({status: 'success', payload: 'Remove a specific resource by its ID'});
    }
    catch(error){
      res.status(400).json({status: 'error', error: error})
    }
  });


// Start the server and listen on the specified port
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});