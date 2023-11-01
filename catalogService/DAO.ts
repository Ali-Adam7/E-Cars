import { car, filter } from "./model";
const mysql = require("mysql2/promise");
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config();

export class DAO {
  connection: any;
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

    const dataSql = fs.readFileSync(path.join(__dirname, "/db/init.sql")).toString();
    const query = await this.connection.query(dataSql);
  };
  getAllCars = async (): Promise<car[] | string> => {
    try {
      let [rows, fields] = await this.connection.execute("SELECT * FROM catalog.cars");
      return rows;
    } catch (error: any) {
      return error.sqlMessage;
    }
  };

  getByID = async (id: string): Promise<car | string | null> => {
    try {
      let [rows, fields] = await this.connection.execute(`SELECT * FROM catalog.cars WHERE id = ${id}`);
      if (rows.length) return rows[0];
      else return null;
    } catch (error: any) {
      return error.sqlMessage;
    }
  };

  getByFilter = async (filters: filter): Promise<car[]> => {
    try {
      const entries = Object.entries(filters);
      let query: string = `SELECT * FROM catalog.cars WHERE `;
      entries.forEach((entry: [string, any]) => {
        if (entry[0] === "price" || entry[0] === "milage") query += `${entry[0]} <= '${entry[1]}' AND `;
        else query += `${entry[0]} = '${entry[1]}' AND `;
      });
      query = query.substring(0, query.length - 4);
      let [rows, fields] = await this.connection.execute(query);
      if (rows.length) return rows as car[];
      return [];
    } catch (error: any) {
      return error.sqlMessage;
    }
  };

  addCar = async (car: car): Promise<string> => {
    const { make, model, type, price, img, year, history, milage } = car;
    try {
      const q = await this.connection.execute(
        `INSERT INTO catalog.cars (make, model,type,price,img,year,history,milage) VALUES ("${make}","${model}","${type}", ${price},"${img}", ${year},"${history}", ${milage})`
      );
      return q[0].affectedRows;
    } catch (error: any) {
      return error.sqlMessage;
    }
  };
  editCar = async (car: car, id: string): Promise<string> => {
    try {
      const entries = Object.entries(car);
      let q = `UPDATE catalog.cars SET `;

      entries.forEach((entry) => {
        if (entry[0] == "year" || entry[0] == "milage") q += `${entry[0]} = ${entry[1]}, `;
        else q += `${entry[0]} = '${entry[1]}', `;
      });
      q = q.substring(0, q.length - 2);
      q += ` WHERE id = ${id}`;
      const query = await this.connection.execute(q);
      return query[0].affectedRows;
    } catch (error: any) {
      return error;
    }
  };
  deleteCar = async (id: number): Promise<string> => {
    try {
      const q = await this.connection.execute(`DELETE FROM catalog.cars WHERE id = ${id}`);
      return q[0].affectedRows;
    } catch (error: any) {
      return error.sqlMessage;
    }
  };
  end = () => {
    this.connection.end();
  };
}
