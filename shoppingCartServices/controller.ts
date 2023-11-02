import express, { Application, json } from "express";
import dotenv from "dotenv";
import {
  addToCart,
  deleteCart,
  deleteFromCart,
  getAllCarts,
  getCartByID,
} from "./services";
//For env File
dotenv.config();
const app: Application = express();
const port = process.env.PORT || 8003;

app.use(json());
app.get("/", getAllCarts); //admin
app.get("/:id", getCartByID); //passing 1 paramater in the function

app.put("/:cartId/:carId", addToCart); //add carID to the CartID we want. Also passing 2 paramtaers in the function

app.delete("/:cartId", deleteCart); //deletes all the cars from the cart as well as the cart

app.delete("/:cartId/:carId", deleteFromCart); // delete specific car from the cart

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
