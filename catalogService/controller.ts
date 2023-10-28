import express, {
  Application,
  json,
} from "express";
import dotenv from "dotenv";
import { getAll, getByFilters, getCarByID } from "./services";
//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8003;

app.use(json());
app.get("/", getAll);
app.get("/:id", getCarByID);
app.get("/filter", getByFilters);


app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
