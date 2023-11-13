import { RequestHandler } from "express";
import { DAO } from "./DAO";
import { Car, Prisma, Reviews } from "@prisma/client";
import { parse } from "path";

const dao = new DAO();
export const getCars: RequestHandler = async (req, res) => {
  try {
    if (!Object.keys(req.query).length) {
      const cars = await dao.getAllCars();
      res.json(cars);
    } else {
      const queryFilters = { ...req.query } as Partial<Car>;
      if (queryFilters.year) queryFilters.year = parseInt(String(req.query.year));
      if (queryFilters.milage) queryFilters.milage = parseInt(String(req.query.milage));
      if (queryFilters.price) queryFilters.price = parseInt(String(req.query.price));
      const makeFilter = queryFilters.make?.split(",") as string[];
      const typeFilter = queryFilters.type?.split(",") as string[];
      const history = Boolean(parseInt(String(queryFilters.history)));
      const filter = { ...queryFilters, make: { in: makeFilter }, type: { in: typeFilter }, history: history };
      const cars = await dao.getByFilter(filter);
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
    else res.status(404).send({});
  } catch (error) {
    res.send(error);
  }
};

export const shopCar: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const car = await dao.getByID(id);
    if (car && car.quantity) {
      const updated = await dao.shopCar(car);
      res.send(updated);
    } else res.send({});
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

export const getCarReviews: RequestHandler = async (req, res) => {
  try {
    if (req.params.id) {
      const id = parseInt(req.params.id);
      const reviews = await dao.getCarReviews(id);
      res.send(reviews);
    }
  } catch (error: any) {
    res.send(error);
  }
};

export const postReview: RequestHandler = async (req, res) => {
  try {
    if (req.params.id) {
      const review = req.body as Reviews;
      const id = parseInt(req.params.id);
      const postedReview = await dao.postReview({ ...review, carID: id });
      res.send(postedReview);
    }
  } catch (error: any) {
    res.send(error);
  }
};
export const getMakes: RequestHandler = async (req, res) => {
  try {
    const result = (await dao.getMakes()) as [];
    const makes = result.map((res: { make: string }) => {
      return res.make;
    });
    res.send(makes);
  } catch (error) {
    res.send(error);
  }
};
export const getDeals: RequestHandler = async (req, res) => {
  try {
    const result = (await dao.getDeals()) as Car[];
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};
