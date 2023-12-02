import { RequestHandler } from "express";
import fs from "fs";
const jwt = require("jsonwebtoken");
import path from "path";
const privateKey = fs.readFileSync(path.resolve(__dirname, "../certificates/key.pem"), "utf8");
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
    res.sendStatus(403);
  }
};
