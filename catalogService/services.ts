import { RequestHandler } from "express";
import { car } from "./model";
import { DAO } from "./DAO";

const dao = new DAO();
dao.createConnection("127.0.0.1", "root", "password", "catalog");

// implement DAO API to talk to the DB and use them in the functions below to retreive data

export const getAll: RequestHandler = async (req, res) => {
  // TODO
  const cars = await dao.getAllCars();
  res.json(cars);
};

export const getCarByID:RequestHandler = async (req, res) => {
  // TODO
  const id: string = req.params.id as string;
  const cars = await dao.getByID(id);
  if (!cars) res.status(404).send({error:"Car not found"});
  else {
    res.json(cars);
  }
};

export const getByFilters: RequestHandler = (req, res) => {
  // TODO
  // Check req query for filters
};

export const addItem: RequestHandler = (req, res) => {
  // TODO
  // Ensure only admins can add items
};
