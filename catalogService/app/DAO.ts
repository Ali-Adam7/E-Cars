import dotenv from "dotenv";
import { Car, PrismaClient, Reviews } from "@prisma/client";
const prisma = new PrismaClient();
export class DAO {
  getAllCars = async (): Promise<Car[]> => {
    try {
      return (await prisma.car.findMany()) as Car[];
    } catch (error: any) {
      throw error;
    }
  };

  getByID = async (id: number): Promise<Car> => {
    try {
      return (await prisma.car.findUnique({ where: { id: id }, include: { reviews: true } })) as Car;
    } catch (error: any) {
      throw error;
    }
  };

  getByFilter = async (filters: any): Promise<Car[]> => {
    try {
      const { yeargt, yearlt, ...fields } = filters;
      return (await prisma.car.findMany({
        where: { ...fields, year: { gte: parseInt(yeargt), lte: parseInt(yearlt) } },
      })) as Car[];
    } catch (error: any) {
      throw error;
    }
  };

  addCar = async (car: Car): Promise<Car> => {
    try {
      return prisma.car.create({ data: car });
    } catch (error: any) {
      throw error;
    }
  };
  editCar = async (car: Car, id: number): Promise<Car> => {
    try {
      return await prisma.car.update({ where: { id: id }, data: { ...car } });
    } catch (error: any) {
      throw error;
    }
  };
  deleteCar = async (id: number): Promise<Car> => {
    try {
      return await prisma.car.delete({ where: { id: id } });
    } catch (error: any) {
      throw error;
    }
  };

  shopCar = async (car: Car, quantity: number): Promise<Car> => {
    try {
      return await prisma.car.update({
        where: { id: car.id },
        data: { ...car, quantity: car.quantity - quantity },
      });
    } catch (error: any) {
      throw error;
    }
  };
  postReview = async (review: Reviews) => {
    try {
      return await prisma.reviews.create({ data: { ...review } });
    } catch (error) {
      throw error;
    }
  };
  getCarReviews = async (id: number) => {
    try {
      return await prisma.reviews.findMany({ where: { carID: id } });
    } catch (error) {
      throw error;
    }
  };
  getMakes = async () => {
    try {
      return await prisma.car.findMany({
        select: { make: true },
        distinct: ["make"],
      });
    } catch (error) {
      throw error;
    }
  };
  getDeals = async () => {
    try {
      return await prisma.car.findMany({ where: { deal: true } });
    } catch (error) {
      throw error;
    }
  };
}
