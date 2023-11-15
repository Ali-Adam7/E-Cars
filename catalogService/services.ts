import { RequestHandler } from "express";
import { DAO } from "./DAO";
import { Car, Prisma, Reviews } from "@prisma/client";

const isValidationError = (error: any) => {
  return String(error).includes("PrismaClientValidationError");
};
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
      res.status(200).json(cars);
    }
  } catch (error: any) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getCarByID: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const car = await dao.getByID(id);
    if (car) res.json(car);
    else res.status(404).send({});
  } catch (error) {
    console.log(error);
    isValidationError(error) ? res.sendStatus(400) : res.sendStatus(500);
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
    console.log(error);
    res.sendStatus(500);
  }
};

export const addCar: RequestHandler = async (req, res) => {
  const car: Car = req.body;
  try {
    const addedCar = await dao.addCar(car);
    res.status(200).send(addedCar);
  } catch (error: any) {
    console.log(error);
    isValidationError(error) ? res.sendStatus(400) : res.sendStatus(500);
  }
};

export const editCar: RequestHandler = async (req, res) => {
  try {
    const car: Car = req.body;
    const id = parseInt(req.params.id);
    const editedCar = await dao.editCar(car, id);
    res.status(202).send(editedCar);
  } catch (error: any) {
    console.log(error);
    isValidationError(error) ? res.sendStatus(400) : res.sendStatus(500);
  }
};

export const deleteCar: RequestHandler = async (req, res) => {
  try {
    if (req.params.id) {
      const id = parseInt(req.params.id?.toString());
      const deletedCar = await dao.deleteCar(id);
      res.status(202).send(deletedCar);
    }
  } catch (error: any) {
    if (String(error).includes("Record to delete does not exist.")) res.sendStatus(400);
    else res.sendStatus(500);
  }
};

export const getCarReviews: RequestHandler = async (req, res) => {
  try {
    if (req.params.id) {
      const id = parseInt(req.params.id);
      const reviews = await dao.getCarReviews(id);
      res.status(200).send(reviews);
    }
  } catch (error: any) {
    console.log(error);
    isValidationError(error) ? res.sendStatus(400) : res.sendStatus(500);
  }
};

export const postReview: RequestHandler = async (req, res) => {
  try {
    if (req.params.id) {
      const review = await req.body;
      const id = parseInt(req.params.id);
      const postedReview = await dao.postReview({ ...review, carID: id });
      res.status(201).send(postedReview);
    }
  } catch (error: any) {
    console.log(error);
    isValidationError(error) ? res.sendStatus(400) : res.sendStatus(500);
  }
};
export const getMakes: RequestHandler = async (req, res) => {
  try {
    const result = (await dao.getMakes()) as [];
    const makes = result.map((res: { make: string }) => {
      return res.make;
    });
    res.status(200).send(makes);
  } catch (error) {
    console.log(error);

    res.sendStatus(500);
  }
};
export const getDeals: RequestHandler = async (req, res) => {
  try {
    const result = (await dao.getDeals()) as Car[];
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const loanCalcualtor: RequestHandler = async (req, res) => {
  try {
    const { price, downPayment, interest, period } = req.body;
    const result =
      (price - downPayment) *
      (((interest / 12) * Math.pow(1 + interest / 12, period)) / (Math.pow(1 + interest / 12, period) - 1));
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
