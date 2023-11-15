import express, { Application, json } from "express";
import dotenv from "dotenv";
import fs from "fs";
import { getUsageReportByID, recrodEvent } from "./services";
//For env File
dotenv.config();
const app: Application = express();
const port = process.env.PORT || 8005;
const https = require("https");
const privateKey = fs.readFileSync("key.pem", "utf8");
const certificate = fs.readFileSync("certificate.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };
const helmet = require("helmet");
var httpsServer = https.createServer(credentials, app);

app.use(json());

httpsServer.listen(port);

app.post("/", recrodEvent);
app.get("/", getUsageReportByID);
