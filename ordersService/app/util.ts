import axios from "axios";
import { Car } from "./model";
import { PO } from "@prisma/client";

let paymentsCounter = 0;
const catalogURL = process.env.CATALOG_URL || "http://localhost:8003";
const shoppingURL = process.env.SHOPPING_URL || "http://localhost:8004";

export const verifyPayment = () => {
  paymentsCounter++;
  if (paymentsCounter % 3 === 0) {
    return false;
  } else return true;
};
export const enoughQuantity = async (cars: Car[]) => {
  for (let i = 0; i < cars.length; i++) {
    const id = cars[i].id;
    const quantity = cars[i].quantity;
    const response = await axios.get(`${catalogURL}/${id}`);
    if (response.data.quantity < quantity) return false;
  }

  return true;
};
export const getCart = async (userID: string, token: string) => {
  const response = await axios.put(`${shoppingURL}/${userID}`, {
    token: token,
  });
  return response;
};

export const processOrder = async (userID: string, cars: Car[], token: string) => {
  // 1) subtract quantity from catalog:
  for (let i = 0; i < cars.length; i++) {
    const id = cars[i].id;
    const quantity = cars[i].quantity;
    const response = await axios.put(`${catalogURL}/car/shop`, {
      data: {
        id: id,
        quantity: quantity,
      },
      headers: { "Content-Type": "application/json" },
    });
  }

  // submit order to DB

  // empty shopping cart for user
  const response = await axios.delete(`${shoppingURL}/${userID}`, {
    method: "DELETE",
    data: { token: token },
    headers: { "Content-Type": "application/json" },
  });
  const order: Partial<PO> = {
    userID: parseInt(userID),
    status: "PROCESSED",
  };
  return order;
};

export const getOrderDetails = async (
  orders: ({
    items: {
      POid: number;
      vid: number;
      price: number;
      quantity: number;
    }[];
  } & {
    id: number;
    userID: number;
    status: string;
  })[]
) => {
  for (let i = 0; i < orders.length; i++) {
    for (let j = 0; j < orders[i].items.length; j++) {
      const vid = orders[i].items[j].vid;
      const carDetails = await (await fetch(`${catalogURL}/${vid}`)).json();
      const boughtQuantity = orders[i].items[j].quantity;
      orders[i].items[j] = { ...carDetails, quantity: boughtQuantity };
    }
  }
};

export const processGuestOrder = async (cars: Car[]) => {
  for (let i = 0; i < cars.length; i++) {
    const id = cars[i].id;
    const quantity = cars[i].quantity;
    const response = await axios.put(`${catalogURL}/car/shop`, {
      data: {
        id: id,
        quantity: quantity,
      },
      headers: { "Content-Type": "application/json" },
    });
  }
};
