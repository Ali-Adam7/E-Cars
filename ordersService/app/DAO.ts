const mysql = require("mysql2/promise");
import { PO, POItem, PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { Car } from "./model";
const prisma = new PrismaClient();
dotenv.config();

export class DAO {
  submitOrder = async (order: Partial<PO>, cars: Car[]) => {
    // @ts-ignore
    const { id } = await prisma.pO.create({ data: order });
    for (let i = 0; i < cars.length; i++) {
      const POItem: POItem = {
        POid: id,
        vid: cars[i].id,
        price: parseInt(String(cars[i].price)),
        quantity: cars[i].quantity,
      };
      await prisma.pOItem.create({ data: POItem });
    }

    return;
  };

  getPastOrders = async (id: number) => {
    return await prisma.pO.findMany({ where: { userID: id }, include: { items: true } });
  };
}
