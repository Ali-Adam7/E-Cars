import { RequestHandler } from "express";
import { DAO } from "./DAO";
import axios from "axios";
import { PO } from "@prisma/client";
import { Car } from "./model";

let paymentsCounter = 0;
const dao = new DAO();

export const verifyPayment = () => {
  paymentsCounter++;
  if (paymentsCounter % 3 === 0) {
    return false;
  } else return true;
};

export const submitOrder: RequestHandler = async (req, res) => {
  try {
    const userID = String(req.params.id);

    // Contact the shopping cart to get the cars :
    const response = await axios.get(`https://localhost:8004/${userID}`, {
      method: "GET",
      headers: { rejectUnauthorized: false, "Content-Type": "application/json" },
    });

    // Check if there is enough inventory:
    const cars = await response.data;
    const enough = enoughQuantity(cars);
    if (!enough) {
      res.status(406).send("Out of stock");
      return;
    }

    // check payment :
    const payment = verifyPayment();
    if (!payment) {
      const order: Partial<PO> = {
        userID: parseInt(userID),
        status: "PAYMENY DENIED",
      };
      await dao.submitOrder(order, cars);
      res.status(406).send("PAYMENY DENIED");
      return;
    }
    // allow order:
    await processOrder(userID, cars);
    res.sendStatus(202);
  } catch (error) {
    if (String(error).includes("404")) res.sendStatus(404);
    else res.sendStatus(500);
    return;
  }
};
export const enoughQuantity = async (cars: Car[]) => {
  for (let i = 0; i < cars.length; i++) {
    const id = cars[i].id;
    const quantity = cars[i].quantity;
    const response = await axios.get(`https://localhost:8003/${id}`, { headers: { rejectUnauthorized: false } });
    if (response.data.quantity < quantity) return false;
  }

  return true;
};
export const processOrder = async (userID: string, cars: Car[]) => {
  // 1) subtract quantity from catalog:
  for (let i = 0; i < cars.length; i++) {
    const id = cars[i].id;
    const quantity = cars[i].quantity;
    const response = await axios.put(`https://localhost:8003/car/shop`, {
      method: "PUT",
      data: {
        id: id,
        quantity: quantity,
      },
      headers: { rejectUnauthorized: false, "Content-Type": "application/json" },
    });
  }

  // submit order to DB
  const order: Partial<PO> = {
    userID: parseInt(userID),
    status: "PROCESSED",
  };
  // empty shopping cart for user
  await dao.submitOrder(order, cars);
  const response = await axios.delete(`https://localhost:8004/${userID}`, {
    method: "DELETE",
    headers: { rejectUnauthorized: false, "Content-Type": "application/json" },
  });
};

export const getPastOrders: RequestHandler = async (req, res) => {
  const userID = req.params.id;
  const orders = await dao.getPastOrders(parseInt(userID));
  res.send(orders);
};
