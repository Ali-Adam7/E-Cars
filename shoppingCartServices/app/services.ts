import { RequestHandler } from "express";
import { DAO } from "./DAO";
import { getCars, isValidationError } from "./util";

const dao = new DAO();

export const getCartByID: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.cartID); //need id to match it with cartsID
    const cart = await dao.getCartByID(id); //pass the id as parm
    if (cart.length == 0) {
      res.sendStatus(404);
      return;
    }
    const cars = await getCars(cart);
    res.json(cars);
    return;
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
