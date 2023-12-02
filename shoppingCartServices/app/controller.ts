import express, { Application, json } from "express";
import dotenv from "dotenv";
import { addToCart, deleteCart, deleteFromCart, getCartByID } from "./services";
import fs from "fs";
import { middleware } from "./middleware";
import path from "path";
//For env File
const https = require("https");
const privateKey = fs.readFileSync(path.resolve(__dirname, "../certificates/key.pem"), "utf8");
const certificate = fs.readFileSync(path.resolve(__dirname, "../certificates/certificate.pem"), "utf8");
const credentials = { key: privateKey, cert: certificate };

dotenv.config();
const app: Application = express();
const port = process.env.PORT || 8004;
var httpsServer = https.createServer(credentials, app);

app.use(json());
app.use("/:cartID", middleware);
app.put("/:cartID", getCartByID); //passing 1 paramater in the function

app.delete("/:cartID", deleteCart); //deletes all the cars from the cart as well as the cart
app.use("/:cartID/:carID", middleware);
app.post("/:cartID/:carID", addToCart); //add carID to the CartID we want. Also passing 2 paramtaers in the function
app.delete("/:cartID/:carID", deleteFromCart); //deletes all the cars from the cart as well as the cart
//httpsServer.listen(port);
app.listen(port, () => {});
