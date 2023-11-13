import { RequestHandler } from "express";
import { DAO } from "./DAO";

const dao = new DAO();

export const getAllCarts: RequestHandler = async (req, res) => {
  try {
    const carts = await dao.getAllCarts();
    res.json(carts);
  } catch (error) {
    res.sendStatus(500).send(error);
  }
};
export const getCartByID: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id); //need id to match it with cartsID
    const result = await dao.getCartByID(id); //pass the id as parm
    const cart = result.map((recrod: any) => {
      return { carID: recrod.carID, quantity: recrod.quantity };
    });
    res.json(cart);
  } catch (error) {
    res.sendStatus(500).send(error);
  }
};

export const addToCart: RequestHandler = async (req, res) => {
  try {
    const { cartID, carID } = req.params; //holds both paramater cartId carId
    const cart = await dao.addCart(parseInt(cartID), parseInt(carID));
    res.sendStatus(201).send(cart);
  } catch (error) {
    res.sendStatus(500).send(error);
  }
};

export const deleteCart: RequestHandler = async (req, res) => {
  try {
    const cartID = parseInt(req.params.cartID); //need id to match it with cartsID
    const result = await dao.deleteCart(cartID); //pass the cartId as parm
    res.sendStatus(202).send(result);
  } catch (error) {
    res.sendStatus(204).send(error);
  }
};

// delete car from cart
export const deleteFromCart: RequestHandler = async (req, res) => {
  try {
    const { cartID, carID } = req.params; //holds both parameters cartId and carI
    const cart = await dao.deleteFromCart(parseInt(cartID), parseInt(carID));
    res.sendStatus(202).send(cart);
  } catch (error) {
    res.sendStatus(204).send(error);
  }
};
