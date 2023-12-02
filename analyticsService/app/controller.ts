import express, { Application, json } from "express";
import dotenv from "dotenv";
import fs from "fs";
import { getUsageReport, getUsageReportByID, recrodEvent } from "./services";
import { middleware } from "./middleware";
import path from "path";
const privateKey = fs.readFileSync(path.resolve(__dirname, "../certificates/key.pem"), "utf8");
const certificate = fs.readFileSync(path.resolve(__dirname, "../certificates/certificate.pem"), "utf8");
dotenv.config();
const app: Application = express();
const port = process.env.PORT || 8005;
const https = require("https");

const credentials = { key: privateKey, cert: certificate };
const helmet = require("helmet");
var httpsServer = https.createServer(credentials, app);

app.use(json());
app.use(helmet());
app.post("/", recrodEvent);

app.use(middleware);
app.put("/", getUsageReport);
app.put("/:id", getUsageReportByID);

app.listen(port, () => {});
//httpsServer.listen(port);
