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

export const validatePassword = (password: string, hash: string) => {
  bcrypt.compare(password, hash, function (err: Error, result: boolean) {
    return result;
  });
};

export const registerUser: RequestHandler = async (req, res) => {
  try {
    const user = { ...req.body, createdAt: new Date(), password: await bcrypt.hash(req.body.password, saltRounds) };
    const createdUser = await dao.registerUser(user);

    delete createdUser.password;
    const token = await jwt.sign(createdUser, privateKey, { algorithm: "RS256" });
    res.send({ ...createdUser, token: token });
  } catch (error: any) {
    res.status(401).send("error registering user");
  }
};

export const authenticateUser: RequestHandler = async (req, res) => {
  try {
    const dbUser = await dao.getUserByEmail(req.body.email);

    if (dbUser) {
      const validation = await bcrypt.compare(req.body.password, dbUser.password);
      if (validation) {
        const token = jwt.sign(dbUser, privateKey, { algorithm: "RS256" });
        delete dbUser.password;
        res.status(200).json({ ...dbUser, token: token });
      } else {
        res.status(404).send("Wrong password or email address");
      }
    } else {
      res.status(404).send("Wrong password or email address");
    }
  } catch (error: any) {
    res.status(500).send(error);
  }
};
