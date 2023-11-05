import { RequestHandler } from "express";
import { DAO } from "./DAO";
import { Car } from "@prisma/client";

const dao = new DAO();
export const getCars: RequestHandler = async (req, res) => {
  try {
    if (!Object.keys(req.query).length) {
      const cars = await dao.getAllCars();
      res.json(cars);
    } else {
      const filters = { ...req.query } as Partial<Car>;
      if (filters.year) filters.year = parseInt(String(req.query.year));
      if (filters.milage) filters.milage = parseInt(String(req.query.milage));
      if (filters.price) filters.price = parseInt(String(req.query.price));
      const cars = await dao.getByFilter(filters);
      res.json(cars);
    }
  } catch (error: any) {
    res.send(error);
  }
};

export const getCarByID: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const car = await dao.getByID(id);
    if (car) res.send(car);
    else res.send({});
  } catch (error) {
    res.send(error);
  }
};

export const addCar: RequestHandler = async (req, res) => {
  const car: Car = req.body;

  try {
    const addedCar = await dao.addCar(car);
    res.send(addedCar);
  } catch (error: any) {
    res.send(error);
  }
};

export const editCar: RequestHandler = async (req, res) => {
  try {
    const car: Car = req.body;
    const id = parseInt(req.params.id);
    const editedCar = await dao.editCar(car, id);
    res.send(editedCar);
  } catch (error: any) {
    res.send(error);
  }
};

export const deleteCar: RequestHandler = async (req, res) => {
  try {
    if (req.params.id) {
      const id = parseInt(req.params.id?.toString());
      const deletedCar = await dao.deleteCar(id);
      res.send(deletedCar);
    }
  } catch (error: any) {
    res.send(error);
  }
};

export const deleteAll: RequestHandler = async (req, res) => {
  try {
    const count = await dao.deleteAll();
    res.json(count);
  } catch (error: any) {
    res.send(error);
  }
};
