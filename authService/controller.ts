import express, { Application, json } from "express";
import dotenv from "dotenv";
import { registerUser, authenticateUser, getUserByID } from "./services";
import fs from "fs";
const https = require("https");
const privateKey = fs.readFileSync("key.pem", "utf8");
const certificate = fs.readFileSync("certificate.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };
const helmet = require("helmet");

dotenv.config();
const app: Application = express();
const port = process.env.PORT || 8002;
var httpsServer = https.createServer(credentials, app);

app.use(json());
app.use(helmet());
app.get("/:id", getUserByID);

app.post("/", registerUser);
app.put("/", authenticateUser);

//httpsServer.listen(port);
app.listen(port, () => {});
