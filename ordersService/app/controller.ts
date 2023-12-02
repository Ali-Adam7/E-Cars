import express, { Application, json } from "express";
import dotenv from "dotenv";
import fs from "fs";
import { getPastOrders, guestOrder, submitOrder } from "./service";
import { middleware } from "./middleware";
import path from "path";
dotenv.config();
const app: Application = express();
const port = process.env.PORT || 8006;
const https = require("https");
const privateKey = fs.readFileSync(path.resolve(__dirname, "../certificates/key.pem"), "utf8");
const certificate = fs.readFileSync(path.resolve(__dirname, "../certificates/certificate.pem"), "utf8");
const credentials = { key: privateKey, cert: certificate };
var httpsServer = https.createServer(credentials, app);
app.use(json());

app.post("/order/guest", guestOrder);
app.use("/:id", middleware);

app.put("/:id", getPastOrders);
app.post("/:id", submitOrder);
//httpsServer.listen(port);
app.listen(port, () => {});
