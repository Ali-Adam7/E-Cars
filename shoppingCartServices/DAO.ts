const mysql = require("mysql2/promise");
import { Cart, PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config();
const prisma = new PrismaClient();

export class DAO {
  getAllCarts = async () => {
    try {
      const allCarts = await prisma.cart.findMany();
      return allCarts;
    } catch (error: any) {
      return error;
    }
  };

  getCartByID = async (id: number) => {
    try {
      const cart = (await prisma.cart.findMany({ where: { id: id } })) as Cart[];
      return cart;
    } catch (error: any) {
      return error;
    }
  };

  addCart = async (cartId: number, carID: number) => {
    try {
      const cart = await prisma.cart.create({ data: { id: cartId, carID: carID } });
      return cart;
    } catch (error: any) {
      return error;
    }
  };

  async deleteCart(cartID: number) {
    try {
      const cart = await prisma.cart.deleteMany({ where: { id: cartID } });

      return cart;
    } catch (error: any) {
      return error;
    }
  }

  async deleteFromCart(cartID: number, carID: number) {
    try {
      const cart = await prisma.cart.deleteMany({ where: { id: cartID, carID: carID } });

      return cart;
    } catch (error: any) {
      return error;
    }
  }
}
