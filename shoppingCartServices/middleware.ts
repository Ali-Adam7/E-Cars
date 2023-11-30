import { RequestHandler } from "express";
import fs from "fs";
const jwt = require("jsonwebtoken");
const privateKey = fs.readFileSync("key.pem", "utf8");

export const middleware: RequestHandler = async (req, res, next) => {
  const token = req.body.token;
  const cartID = req.params.cartID;
  try {
    const { id } = await jwt.verify(token, privateKey);
    if (cartID != id) {
      res.sendStatus(403);
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
};
