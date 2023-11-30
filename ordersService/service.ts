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
    const token = req.body.token;
    // Contact the shopping cart to get the cars :
    const response = await axios.put(`http://shopping:8004/${userID}`, {
      token: token,
    });
    if (response.status == 404) {
      res.sendStatus(404);
      return;
    }

    // Check if there is enough inventory:
    const cars = await response.data;
    const enough = await enoughQuantity(cars);

    if (!enough) {
      res.status(406).send("Out of Stock");
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
    await processOrder(userID, cars, token);
    res.status(202).send("Success");
    return;
  } catch (error) {
    console.log(error);
    if (String(error).includes("404")) {
      res.sendStatus(404);
      return;
    } else res.sendStatus(500);
    return;
  }
};
export const enoughQuantity = async (cars: Car[]) => {
  for (let i = 0; i < cars.length; i++) {
    const id = cars[i].id;
    const quantity = cars[i].quantity;
    const response = await axios.get(`http://catalog:8003/${id}`);
    if (response.data.quantity < quantity) return false;
  }

  return true;
};
export const processOrder = async (userID: string, cars: Car[], token: string) => {
  // 1) subtract quantity from catalog:
  for (let i = 0; i < cars.length; i++) {
    const id = cars[i].id;
    const quantity = cars[i].quantity;
    const response = await axios.put(`http://catalog:8003/car/shop`, {
      data: {
        id: id,
        quantity: quantity,
      },
      headers: { "Content-Type": "application/json" },
    });
  }

  // submit order to DB
  const order: Partial<PO> = {
    userID: parseInt(userID),
    status: "PROCESSED",
  };
  // empty shopping cart for user
  await dao.submitOrder(order, cars);
  const response = await axios.delete(`http://shopping:8004/${userID}`, {
    method: "DELETE",
    data: { token: token },
    headers: { "Content-Type": "application/json" },
  });
};

export const getPastOrders: RequestHandler = async (req, res) => {
  try {
    const userID = req.params.id;
    const orders = await dao.getPastOrders(parseInt(userID));
    for (let i = 0; i < orders.length; i++) {
      for (let j = 0; j < orders[i].items.length; j++) {
        const vid = orders[i].items[j].vid;
        const carDetails = await (await fetch(`http://catalog:8003/${vid}`)).json();
        const boughtQuantity = orders[i].items[j].quantity;
        orders[i].items[j] = { ...carDetails, quantity: boughtQuantity };
      }
    }
    res.send(orders);
    return;
  } catch {
    res.status(500);
    return;
  }
};

export const guestOrder: RequestHandler = async (req, res) => {
  try {
    // Check if there is enough inventory:
    const cars = req.body;
    const enough = await enoughQuantity(cars);

    if (!enough) {
      res.status(406).send("Out of stock");
      return;
    }

    // check payment :
    const payment = verifyPayment();
    if (!payment) {
      const order: Partial<PO> = {
        status: "PAYMENY DENIED",
        userID: 0,
      };
      await dao.submitOrder(order, cars);
      res.status(406).send("PAYMENY DENIED");
      return;
    }
    // allow order:
    for (let i = 0; i < cars.length; i++) {
      const id = cars[i].id;
      const quantity = cars[i].quantity;
      const response = await axios.put(`http://catalog:8003/car/shop`, {
        data: {
          id: id,
          quantity: quantity,
        },
        headers: { "Content-Type": "application/json" },
      });
    }
    // submit order to DB
    const order: Partial<PO> = {
      userID: 0,
      status: "PROCESSED",
    };
    // empty shopping cart for user
    await dao.submitOrder(order, cars);
    res.sendStatus(202);
    return;
  } catch (error) {
    console.log(error);
    if (String(error).includes("404")) {
      res.sendStatus(404);
      return;
    } else res.sendStatus(500);
    return;
  }
};
