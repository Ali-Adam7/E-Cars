import { RequestHandler } from "express";
import { DAO } from "./DAO";
import fs from "fs";
import { User } from "@prisma/client";

const dao = new DAO();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

// sign with RSA SHA256
const privateKey = fs.readFileSync("key.pem");
const isValidationError = (error: any) => {
  return String(error).includes("PrismaClientValidationError");
};
export const validatePassword = (password: string, hash: string) => {
  bcrypt.compare(password, hash, function (err: Error, result: boolean) {
    return result;
  });
};

export const registerUser: RequestHandler = async (req, res) => {
  try {
    const user = { ...req.body, createdAt: new Date(), password: await bcrypt.hash(req.body.password, saltRounds) };
    const createdUser = await dao.registerUser(user);
    createdUser.password = "";
    const token = await jwt.sign(createdUser, privateKey, { algorithm: "RS256" });
    res.status(201).send({ ...createdUser, token: token, role: "user" });
  } catch (error: any) {
    console.log(error);
    isValidationError(error) ? res.sendStatus(400) : res.sendStatus(500);
  }
};

export const authenticateUser: RequestHandler = async (req, res) => {
  try {
    const dbUser = await dao.getUserByEmail(req.body.email);

    if (dbUser) {
      const validation = await bcrypt.compare(req.body.password, dbUser.password);
      if (validation) {
        const token = jwt.sign(dbUser, privateKey, { algorithm: "RS256" });
        dbUser.password = "";
        res.status(202).json({ ...dbUser, token: token });
      } else res.sendStatus(404);
    } else res.sendStatus(404);
  } catch (error: any) {
    console.log(error);
    isValidationError(error) ? res.sendStatus(400) : res.sendStatus(500);
  }
};
export const getUserByID: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await dao.getUserByID(id);
    if (user) {
      res.status(200).json(user);
    } else res.sendStatus(404);
  } catch (error: any) {
    console.log(error);
    res.sendStatus(500);
  }
};
