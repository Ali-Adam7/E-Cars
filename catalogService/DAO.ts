const mysql = require("mysql2/promise");
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { Car, PrismaClient, Reviews } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { AnyARecord } from "dns";
const prisma = new PrismaClient();
dotenv.config();

export class DAO {
  getAllCars = async (): Promise<Car[]> => {
    try {
      const allCars = (await prisma.car.findMany()) as Car[];
      return allCars;
    } catch (error: any) {
      throw error;
    }
  };

  getByID = async (id: number): Promise<Car> => {
    try {
      const car = (await prisma.car.findUnique({ where: { id: id } })) as Car;
      return car;
    } catch (error: any) {
      throw error;
    }
  };

  getByFilter = async (filters: any): Promise<Car[]> => {
    try {
      const filteredCars = (await prisma.car.findMany({
        where: filters,
      })) as Car[];
      return filteredCars;
    } catch (error: any) {
      throw error;
    }
  };

  addCar = async (car: Car): Promise<Car> => {
    try {
      const newCar = prisma.car.create({ data: car });
      return newCar;
    } catch (error: any) {
      throw error;
    }
  };
  editCar = async (car: Car, id: number): Promise<Car> => {
    try {
      const editedCar = await prisma.car.update({ where: { id: id }, data: { ...car } });
      return editedCar;
    } catch (error: any) {
      throw error;
    }
  };
  deleteCar = async (id: number): Promise<Car> => {
    try {
      const deletedCar = await prisma.car.delete({ where: { id: id } });
      return deletedCar;
    } catch (error: any) {
      throw error;
    }
  };

  shopCar = async (car: Car, quantity: number): Promise<Car> => {
    try {
      const updated = await prisma.car.update({
        where: { id: car.id },
        data: { ...car, quantity: car.quantity - quantity },
      });
      return updated;
    } catch (error: any) {
      throw error;
    }
  };
  postReview = async (review: Reviews) => {
    try {
      const postedReview = await prisma.reviews.create({ data: { ...review } });
      return postedReview;
    } catch (error) {
      throw error;
    }
  };
  getCarReviews = async (id: number) => {
    try {
      const reviews = await prisma.reviews.findMany({ where: { carID: id } });
      return reviews;
    } catch (error) {
      throw error;
    }
  };
  getMakes = async () => {
    try {
      const makes = await prisma.car.findMany({
        select: { make: true },
        distinct: ["make"],
      });
      return makes;
    } catch (error) {
      throw error;
    }
  };
  getDeals = async () => {
    try {
      const carsOnSale = await prisma.car.findMany({ where: { deal: true } });
      return carsOnSale;
    } catch (error) {
      throw error;
    }
  };
}
