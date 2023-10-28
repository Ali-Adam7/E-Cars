import { car } from "./model";
const mysql = require('mysql2/promise');

export class DAO {
  connection: any;
  createConnection = async(host: string, user: string, password: string, database: string) => {
    this.connection =  await mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database,
      });
  }
  getAllCars = async (): Promise<car[]> => {
    let [rows, fields] = await this.connection.execute('SELECT * FROM catalog.cars');
    return rows
};

getByID = async (id:string): Promise<car | null>=> {
    let [rows, fields] = await this.connection.execute(`SELECT * FROM catalog.cars WHERE id = ${id}`);
    if(rows.length)
    return rows[0]
    else return null
};


  end = () => {
    this.connection.end();
  };
}
