import { RequestHandler } from "express";
import fs from "fs";
const jwt = require("jsonwebtoken");
const privateKey = fs.readFileSync("key.pem", "utf8");

export const middleware: RequestHandler = async (req, res, next) => {
  const { token } = req.body;
  try {
    const { role } = await jwt.verify(token, privateKey);
    if (role !== "admin") {
      res.sendStatus(403);
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
};
