import { RequestHandler } from "express";
import { DAO } from "./DAO";
import { PO } from "@prisma/client";
import { enoughQuantity, getCart, getOrderDetails, processGuestOrder, processOrder, verifyPayment } from "./util";

const dao = new DAO();

export const submitOrder: RequestHandler = async (req, res) => {
  try {
    const userID = String(req.params.id);
    const token = req.body.token;
    // Contact the shopping cart to get the cars :
    const cart = await getCart(userID, token);
    if (cart.status == 404) {
      res.sendStatus(404);
      return;
    }
    // Check if there is enough inventory:
    const cars = await cart.data;
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
    const order = await processOrder(userID, cars, token);
    await dao.submitOrder(order, cars);
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

export const getPastOrders: RequestHandler = async (req, res) => {
  try {
    const userID = req.params.id;
    const orders = await dao.getPastOrders(parseInt(userID));
    await getOrderDetails(orders);
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
    await processGuestOrder(cars);
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
