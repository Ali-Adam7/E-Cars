import express, { Application, json } from "express";
import dotenv from "dotenv";
import { addCar, deleteCar, editCar, getCarByID, getCarReviews, getCars, postReview, shopCar } from "./services";
//For env File
dotenv.config();
const app: Application = express();
const port = process.env.PORT || 8003;

app.use(json());
app.get("/", getCars);
app.get("/:id", getCarByID);
app.get("/review/:id", getCarReviews);

app.put("/order/:id", shopCar);
app.post("/review/:id", postReview);

// Needs Token:
app.post("/", addCar);
app.put("/:id", editCar);

app.delete("/:id", deleteCar);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
