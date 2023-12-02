import express, { Application, json } from "express";
import dotenv from "dotenv";
import { registerUser, authenticateUser, getUserByID } from "./services";
import fs from "fs";
import path from "path";
dotenv.config();

const https = require("https");
const privateKey = fs.readFileSync(path.resolve(__dirname, "../certificates/key.pem"), "utf8");
const certificate = fs.readFileSync(path.resolve(__dirname, "../certificates/certificate.pem"), "utf8");
const credentials = { key: privateKey, cert: certificate };
const helmet = require("helmet");
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
