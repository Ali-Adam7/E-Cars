import express, { Application, json } from "express";
import dotenv from "dotenv";
import { addCar, deleteAll, deleteCar, editCar, getCarByID, getCars } from "./services";
//For env File
dotenv.config();
const app: Application = express();
const port = process.env.PORT || 8003;

app.use(json());
app.get("/", getCars);
app.get("/:id", getCarByID);

// Middleware:

app.post("/", addCar);
app.put("/:id", editCar);

app.delete("/", deleteAll);
app.delete("/:id", deleteCar);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
module.exports = app;
