import express, { Application, json } from "express";
import dotenv from "dotenv"; // environment variable 
import { addCar, deleteCar, editCar, getByFilters, getCarByID, getCars } from "./services"; //service functions(its like a folder)
//For env File
dotenv.config(); 
const app: Application = express(); // initialize express server
const port = process.env.PORT || 8003; // which port the server runs on


// we can have the controller and service in 1 files acting as controller to talk 
// to the DAO but we have to initilize the DAO in this file
//app.get(/,(req,res) => { the function implementation here});

app.use(json()); // accepts json romat data
app.get("/", getCars); // Routing to getCars function
app.get("/:id", getCarByID);

// Middleware:

app.post("/", addCar);
app.put("/:id", editCar);

app.delete("/:id", deleteCar);

app.listen(port, () => { //listens for the request in the port we have
  console.log(`Server is Fire at http://localhost:${port}`);
});
