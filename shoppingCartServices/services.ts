import { RequestHandler } from "express";
import { car, cart } from "./model";
import { DAO } from "./DAO";
import { parse } from "dotenv";

const dao = new DAO();

try {
  dao.createConnection();
} catch {
  console.log("Error happened while connecting to the DB");
}

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
    res.json(result);
  } catch (error) {
    res.send(error);
  }
};

export const addToCart: RequestHandler = async (req, res) => {
  try {
    // cart already exists so we just add the car to the cart
    const { cartId, carId } = req.params; //holds both paramater cartId carId
    const result = await dao.getCartByID(parseInt(cartId));
    //cart exists in the table
    if (result.length) {
      // if the row is not empty then its found and get the row
      const row = result[0];
      // make an array of carIds
      const carsInCart: string[] = row.carsIds.split(",");
      if (carsInCart.includes(carId)) {
        res.send("Car already in cart");
      } else {
        carsInCart.push(carId);

        // pass the cartId and String carsInCart
        const result = await dao.updateCart(
          parseInt(cartId),
          carsInCart.join(",")
        );
        if (result) res.send("Cart updated");
        else res.send("cart not updated");
      }
    } else {
      // cart is not there so we create a new one and add the car to the cart
      const result = await dao.addCart(parseInt(cartId), parseInt(carId));
      if (result) res.send("Car added"); //if the result is not 0(positive)
      else res.send("car not added");
    }

    //  const result = await dao.getCartByID(id) //pass the id as parm
  } catch (error) {
    res.send(error);
  }
};

export const deleteCart: RequestHandler = async (req, res) => {
  try {
    const cartId = parseInt(req.params.cartId); //need id to match it with cartsID
    const result = await dao.deleteCart(cartId); //pass the cartId as parm
    // the result is going to give either affected rows is 0 or 1 so we are saying if its 1 then the cart is there. result is an integer not object
    if (result) res.send("Cart Deleted");
    else res.send("Cart not Deleted");
  } catch (error) {
    res.send(error);
  }
};

// delete car from cart
export const deleteFromCart: RequestHandler = async (req, res) => {
  try {
    const { cartId, carId } = req.params; //holds both parameters cartId and carI

    // destrucuring the array object to an object to manipulate easier. Instead of [{}] now we have {}
    const [cart] = await dao.getCartByID(parseInt(cartId));
    // check if the cart is empty
    if (!cart) res.send("Cart does not exist");
    // the cart is in the db
    else {
      const carsInCart: string[] = cart.carsIds.split(",");
      // car is not in cart
      if (!carsInCart.includes(carId)) {
        res.send("Car does not exist in cart");
      } else {
        // if there is only 1 car in cart we delete the whole cart
        if (carsInCart.length === 1) {
          const rowsAffected = await dao.deleteCart(parseInt(cartId));
          if (rowsAffected) res.send("Cart deleted");
          else res.send("Cart not deleted");
          // if there is more than 1 car in cart we delete the carId we want to delete
        } else {
          // remove the car and update the array without carId
          const updatedCart = carsInCart.filter((oldCar) => oldCar !== carId);
          const affectedRows = await dao.updateCart(
            parseInt(cartId),
            updatedCart.join(",")
          );
          if (affectedRows) res.send("Car deleted");
          else {
            res.send("Car not deleted");
          }
        }
      }
    }
  } catch (error) {
    res.send(error);
  }
};
