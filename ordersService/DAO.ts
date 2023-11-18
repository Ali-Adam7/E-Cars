const mysql = require("mysql2/promise");
import { PO, POItem, PrismaClient } from "@prisma/client";
import { count } from "console";
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
        id: id,
        vid: cars[i].id,
        price: parseInt(String(cars[i].price)),
        quantity: cars[i].quantity,
      };
      await prisma.pOItem.create({ data: POItem });
    }

    return;
  };

  getPastOrders = async (id: number) => {
    let orders = await prisma.pO.findMany({ where: { userID: id } });
    for (let i = 0; i < orders.length; i++) {
      const POItems = await prisma.pOItem.findMany({ where: { id: orders[i].id } });
      console.log(POItems);
      // @ts-ignore
      orders[i].items = [...POItems];
    }
    return orders;
  };
}
