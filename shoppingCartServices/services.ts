import { RequestHandler } from "express";
import { DAO } from "./DAO";
import { parse } from "dotenv";

const dao = new DAO();

export const getAllCarts: RequestHandler = async (req, res) => {
  try {
    const result = await dao.getAllCarts();
    res.json(result);
  } catch (error) {
    res.send(error);
  }
};
export const getCartByID: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id); //need id to match it with cartsID
    const result = await dao.getCartByID(id); //pass the id as parm
    const cart = result.map((recrod: any) => recrod.carID);
    res.json(cart);
  } catch (error) {
    res.send(error);
  }
};

export const addToCart: RequestHandler = async (req, res) => {
  try {
    const { cartID, carID } = req.params; //holds both paramater cartId carId
    const cart = await dao.addCart(parseInt(cartID), parseInt(carID));
    res.send(cart);
  } catch (error) {
    res.send(error);
  }
};

export const deleteCart: RequestHandler = async (req, res) => {
  try {
    const cartID = parseInt(req.params.cartID); //need id to match it with cartsID
    const result = await dao.deleteCart(cartID); //pass the cartId as parm
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

// delete car from cart
export const deleteFromCart: RequestHandler = async (req, res) => {
  try {
    const { cartID, carID } = req.params; //holds both parameters cartId and carI
    const cart = await dao.deleteFromCart(parseInt(cartID), parseInt(carID));
    res.send(cart);
  } catch (error) {
    res.send(error);
  }
};
