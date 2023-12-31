import express, { Application, json } from "express";
import dotenv from "dotenv";
import {
  addCar,
  deleteCar,
  editCar,
  getCarByID,
  getCarReviews,
  getCars,
  getDeals,
  getMakes,
  getRecommendation,
  loanCalcualtor,
  postReview,
  shopCar,
} from "./services";
import fs from "fs";
import path from "path";

dotenv.config();
const app: Application = express();
const port = process.env.PORT || 8003;
const https = require("https");
const privateKey = fs.readFileSync(path.resolve(__dirname, "../certificates/key.pem"), "utf8");
const certificate = fs.readFileSync(path.resolve(__dirname, "../certificates/certificate.pem"), "utf8");
const credentials = { key: privateKey, cert: certificate };
var httpsServer = https.createServer(credentials, app);

app.use(json());
app.get("/", getCars);
app.get("/:id", getCarByID);
app.get("/review/:id", getCarReviews);
app.get("/makes/all", getMakes);
app.put("/car/recommender", getRecommendation);

app.put("/order/:id", shopCar);
app.post("/review/:id", postReview);
app.post("/loan/calculator", loanCalcualtor);
app.get("/deals/all", getDeals);

app.post("/", addCar);
app.put("/:id", editCar);

app.put("/car/shop", shopCar);
app.delete("/:id", deleteCar);

app.listen(port, () => {});
