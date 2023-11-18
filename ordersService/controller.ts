import express, { Express, Request, Response, Application, json } from "express";
import dotenv from "dotenv";
import fs from "fs";
import { getPastOrders, submitOrder } from "./service";
dotenv.config();
const app: Application = express();
const port = process.env.PORT || 8006;
const https = require("https");
const privateKey = fs.readFileSync("key.pem", "utf8");
const certificate = fs.readFileSync("certificate.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };
var httpsServer = https.createServer(credentials, app);
app.use(json());
httpsServer.listen(port);

app.get("/:id", getPastOrders);
app.post("/:id", submitOrder);
