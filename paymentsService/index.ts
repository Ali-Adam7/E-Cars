import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
//For env File 
dotenv.config();

const app: Application  = express();
const port = process.env.PORT || 8005;

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
