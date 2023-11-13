const mysql = require("mysql2/promise");
import { Cart, PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

export class DAO {
  getAllCarts = async (): Promise<Cart[]> => {
    try {
      const allCarts = (await prisma.cart.findMany()) as Cart[];
      return allCarts;
    } catch (error: any) {
      return error;
    }
  };

  getCartByID = async (id: number): Promise<Cart[]> => {
    try {
      const cart = await prisma.cart.findMany({ where: { id: id } });
      return cart;
    } catch (error: any) {
      return error;
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
      return error;
    }
  };

  async deleteCart(cartID: number): Promise<number> {
    try {
      const cart = await prisma.cart.deleteMany({ where: { id: cartID } });

      return cart.count;
    } catch (error: any) {
      return error;
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
      return error;
    }
  }
  async getCarQuantity(cartID: number, carID: number): Promise<number | null> {
    try {
      const previusQuantity = (await prisma.cart.findMany({ where: { id: cartID, carID: carID } }))[0].quantity;
      return previusQuantity;
    } catch (error) {
      return null;
    }
  }
}
