import { RequestHandler } from "express";
import fs from "fs";
const jwt = require("jsonwebtoken");
const privateKey = fs.readFileSync("key.pem", "utf8");

export const middleware: RequestHandler = async (req, res, next) => {
  const { token } = req.body;
  const reqID = req.params.id;
  try {
    const { id } = await jwt.verify(token, privateKey);
    if (reqID != id) {
      res.sendStatus(403);
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
};
