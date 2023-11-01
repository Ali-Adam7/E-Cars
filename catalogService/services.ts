import { RequestHandler } from "express";
import { car } from "./model";
import { DAO } from "./DAO";

const dao = new DAO();
dao.createConnection();

export const getCars: RequestHandler = async (req, res) => {
  try {
    if (!Object.keys(req.query).length) {
      const cars = await dao.getAllCars();
      res.json(cars);
    } else {
      getByFilters(req, res, () => {});
    }
  } catch (error: any) {
    res.send(error.sqlMessage);
  }
};

export const getCarByID: RequestHandler = async (req, res) => {
  const id: string = req.params.id as string;
  const cars = await dao.getByID(id);
  if (!cars) res.status(404).send("Car not found");
  else {
    res.json(cars);
  }
};

export const getByFilters: RequestHandler = async (req, res) => {
  try {
    const cars: car[] = await dao.getByFilter(req.query);
    res.json(cars);
  } catch (error: any) {
    res.send(error.sqlMessage);
  }
};

export const addCar: RequestHandler = async (req, res) => {
  const car: car = req.body as car;

  try {
    const query = await dao.addCar(car);
    if (query === "1") res.send("Car added");
    else res.json({ Result: query });
  } catch (error: any) {
    res.send(error.sqlMessage);
  }
};

export const editCar: RequestHandler = async (req, res) => {
  try {
    const car: car = req.body as car;
    const id = req.params.id;
    const q = await dao.editCar(car, id);
    if (q) res.send("Car edited");
    else res.send("Car not edited");
  } catch (error: any) {
    res.send(error.sqlMessage);
  }
};

export const deleteCar: RequestHandler = async (req, res) => {
  try {
    if (req.params.id) {
      const id = parseInt(req.params.id?.toString());
      const query = await dao.deleteCar(id);
      if (query) res.send(query);
      else res.send(`The car with id ${req.params.id} did not get deleted`);
    }
  } catch (error: any) {
    res.send(error.sqlMessage);
  }
};
