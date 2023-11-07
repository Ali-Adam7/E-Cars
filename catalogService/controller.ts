import express, { Application, json } from "express";
import dotenv from "dotenv";
import { addCar, deleteCar, editCar, getCarByID, getCarReviews, getCars, postReview, shopCar } from "./services";
import fs from "fs";
//For env File
dotenv.config();
const app: Application = express();
const port = process.env.PORT || 8003;
const https = require("https");
const privateKey = fs.readFileSync("key.pem", "utf8");
const certificate = fs.readFileSync("certificate.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };
const helmet = require("helmet");
var httpsServer = https.createServer(credentials, app);

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

httpsServer.listen(port);
