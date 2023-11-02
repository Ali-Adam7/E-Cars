import { car, cart } from "./model";
const mysql = require("mysql2/promise");
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config();

export class DAO {
  connection: any;
  // create connection with MySQL database
  createConnection = async () => {
    this.connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      connectionLimit: process.env.DB_CCONNECTION_LIMIT,
      multipleStatements: true,
    });

    // initlize the sql db:
    try {
      const dataSql = fs
        .readFileSync(path.join(__dirname, "/db/init.sql"))
        .toString();
      const query = await this.connection.query(dataSql);
    } catch {
      console.log("Error happened while connecting");
    }
  };

  getAllCarts = async () => {
    try {
      const query = "SELECT * FROM shoppingCart.carts";
      const [rows, fields] = await this.connection.execute(query); //wait until the result to get back then take the rows values for the cartsID and also save the row field
      return rows;
    } catch (error: any) {
      //catch any error that happens
      return error.sqlMessage;
    }
  };

  getCartByID = async (id: number) => {
    try {
      const query = `SELECT * FROM shoppingCart.carts WHERE cartID = ${id}`; //match the id with database
      const [rows, fields] = await this.connection.execute(query); //wait until the result to get back then take the rows values for the cartsID and also save the row field
      return rows;
    } catch (error: any) {
      //catch any error that happens
      return error.sqlMessage;
    }
  };

  addCart = async (cartId: number, carId: number) => {
    try {
      const query = `INSERT INTO shoppingcart.carts value(${cartId}, "${carId}")`;
      const result = await this.connection.execute(query);
      // return the number of rows affected from the above SQL query in the first element inside the result array
      return result[0].affectedRows;
    } catch (error: any) {
      return error.sqlMessage;
    }
  };

  async updateCart(cartId: number, carsIds: string) {
    try {
      const query = `UPDATE shoppingcart.carts  SET carsIds = "${carsIds}" WHERE cartId = ${cartId}`;
      // execute the sql above
      const result = await this.connection.execute(query);
      // affectedRows shows if we make updates to the table or not
      return result[0].affectedRows;
    } catch (error: any) {
      return error.sqlMessage;
    }
  }

  async deleteCart(cartId: number) {
    try {
      const query = `DELETE FROM shoppingcart.carts WHERE cartId = ${cartId}`;
      // execute the sql above
      const result = await this.connection.execute(query);
      // affectedRows shows if we make updates to the table or not
      return result[0].affectedRows;
    } catch (error: any) {
      return error.sqlMessage;
    }
  }
}
