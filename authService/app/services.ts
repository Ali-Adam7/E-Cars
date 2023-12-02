import { RequestHandler } from "express";
import { DAO } from "./DAO";
import fs from "fs";
import { User } from "@prisma/client";
import path from "path";
import { isValidationError } from "./util";

const dao = new DAO();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const privateKey = fs.readFileSync(path.resolve(__dirname, "../certificates/key.pem"), "utf8");

export const registerUser: RequestHandler = async (req, res) => {
  try {
    const user = {
      ...req.body,
      createdAt: new Date(),
      password: await bcrypt.hash(String(req.body.password), saltRounds),
    };

    const createdUser = await dao.registerUser(user);
    const token = await jwt.sign(createdUser, privateKey, { algorithm: "RS256" });
    createdUser.password = "";
    res.status(201).send({ ...createdUser, token: token, role: "user" });
  } catch (error: any) {
    if (String(error).includes("PrismaClientKnownRequestError")) {
      res.sendStatus(409);
      return;
    }
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
        return;
      }
      res.sendStatus(404);
      return;
    }
    res.sendStatus(404);
    return;
  } catch (error: any) {
    console.log(error);
    isValidationError(error) ? res.sendStatus(400) : res.sendStatus(500);
  }
};

export const getUserByID: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.sendStatus(400);
      return;
    }
    const user = await dao.getUserByID(id);
    if (user) {
      res.status(200).json(user);
      return;
    }
    res.sendStatus(404);
    return;
  } catch (error: any) {
    console.log(error);
    res.sendStatus(500);
  }
};
