import { RequestHandler } from "express";
import { DAO } from "./DAO";

const dao = new DAO();
const isValidationError = (error: any) => {
  return String(error).includes("PrismaClientValidationError");
};
export const getAllCarts: RequestHandler = async (req, res) => {
  try {
    const carts = await dao.getAllCarts();
    res.json(carts);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
export const getCartByID: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id); //need id to match it with cartsID
    const result = await dao.getCartByID(id); //pass the id as parm
    if (result.length == 0) {
      res.sendStatus(404);
      return;
    }
    const cart = result.map((recrod: any) => {
      return { carID: recrod.carID, quantity: recrod.quantity };
    });

    const cars: any[] = [];
    for (let i = 0; i < cart.length; i++) {
      const res = await fetch(`https://localhost:8003/${cart[i].carID}`, {
        method: "GET",
        headers: {
          rejectUnauthorized: "false",
        },
      });
      const car = await res.json();
      car.quantity = cart[i].quantity;
      cars.push(car);
    }

    res.json(cars);
  } catch (error) {
    console.log(error);
    isValidationError(error) ? res.sendStatus(400) : res.sendStatus(500);
  }
};

export const addToCart: RequestHandler = async (req, res) => {
  try {
    const { cartID, carID } = req.params; //holds both paramater cartId carId
    const cart = await dao.addCart(parseInt(cartID), parseInt(carID));
    res.sendStatus(201).send(cart);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const deleteCart: RequestHandler = async (req, res) => {
  try {
    const cartID = parseInt(req.params.cartID); //need id to match it with cartsID
    const result = await dao.deleteCart(cartID); //pass the cartId as parm
    if (result) {
      res.sendStatus(202);
      return;
    }
    res.sendStatus(404);
  } catch (error) {
    console.log(error);
    isValidationError(error) ? res.sendStatus(400) : res.sendStatus(500);
  }
};

// delete car from cart
export const deleteFromCart: RequestHandler = async (req, res) => {
  try {
    const { cartID, carID } = req.params; //holds both parameters cartId and carI
    const cart = await dao.deleteFromCart(parseInt(cartID), parseInt(carID));
    if (cart) res.sendStatus(202);
    else res.sendStatus(204);
  } catch (error) {
    console.log(error);
    isValidationError(error) ? res.sendStatus(400) : res.sendStatus(500);
  }
};
