import { RequestHandler } from "express";
import { DAO } from "./DAO";
import { Car } from "@prisma/client";
import recommenderSystem from "./recommenderSystem";
import { createPrismFilters, isValidationError } from "./util";

const dao = new DAO();
const allCars = dao.getAllCars();

export const getCars: RequestHandler = async (req, res) => {
  try {
    if (!Object.keys(req.query).length) {
      const cars = await dao.getAllCars();
      res.json(cars);
      return;
    }

    const filter = createPrismFilters(req.query);
    const cars = await dao.getByFilter(filter);
    res.status(200).json(cars);
    return;
  } catch (error: any) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getCarByID: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      res.sendStatus(400);
      return;
    }
    const car = await dao.getByID(id);
    if (car) res.json(car);
    else res.sendStatus(404);
    return;
  } catch (error) {
    console.log(error);
    isValidationError(error) ? res.sendStatus(400) : res.sendStatus(500);
  }
};

export const shopCar: RequestHandler = async (req, res) => {
  try {
    const body = req.body;
    const id = parseInt(body.data.id);
    const quantity = parseInt(body.data.quantity);
    //@ts-ignore
    const { reviews, ...car } = await dao.getByID(id);
    if (car && car.quantity) {
      const updated = await dao.shopCar(car, quantity);
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
    const makes = result.map((res: { make: string }) => res.make);
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
export const getRecommendation: RequestHandler = async (req, res) => {
  const car = req.body;
  res.json(recommenderSystem(await allCars, car));
};
