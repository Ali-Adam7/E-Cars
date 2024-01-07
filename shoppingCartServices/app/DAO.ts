const mysql = require("mysql2/promise");
import { Cart, PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

export class DAO {
  getAllCarts = async (): Promise<Cart[]> => {
    try {
      return (await prisma.cart.findMany()) as Cart[];
    } catch (error: any) {
      throw error;
    }
  };

  getCartByID = async (id: number): Promise<Cart[]> => {
    try {
      return await prisma.cart.findMany({ where: { id: id } });
    } catch (error: any) {
      throw error;
    }
  };

  addCart = async (cartID: number, carID: number): Promise<number> => {
    try {
      const previusQuantity = await this.getCarQuantity(cartID, carID);
      if (previusQuantity) {
        const cart = await prisma.cart.updateMany({
          where: { id: cartID, carID: carID },
          data: { quantity: previusQuantity + 1 },
        });
        return cart.count;
      }
      const cart = await prisma.cart.create({ data: { id: cartID, carID: carID, quantity: 1 } });
      return cart.quantity;
    } catch (error: any) {
      throw error;
    }
  };

  async deleteCart(cartID: number): Promise<number> {
    try {
      return (await prisma.cart.deleteMany({ where: { id: cartID } })).count;
    } catch (error: any) {
      throw error;
    }
  }

  async deleteFromCart(cartID: number, carID: number): Promise<number> {
    try {
      const previusQuantity = await this.getCarQuantity(cartID, carID);
      if (previusQuantity && previusQuantity > 1) {
        const cart = await prisma.cart.updateMany({
          where: { id: cartID, carID: carID },
          data: { quantity: previusQuantity - 1 },
        });
        return cart.count;
      }
      const cart = await prisma.cart.deleteMany({ where: { id: cartID, carID: carID } });
      return cart.count;
    } catch (error: any) {
      throw error;
    }
  }
  async getCarQuantity(cartID: number, carID: number): Promise<number | null> {
    try {
      return (await prisma.cart.findMany({ where: { id: cartID, carID: carID } }))[0]?.quantity;
    } catch (error) {
      throw error;
    }
  }
}
