import { describe, expect, test } from "@jest/globals";
import { PrismaClient } from "@prisma/client";
const request = require("supertest");
const prisma = new PrismaClient();

const app = require("./controller");
const car1 = {
  make: "Toyota",
  model: "Yaris",
  year: 2020,
  type: "SUV",
  price: 25000,
  img: "",
  history: "no damange",
  milage: 0,
};

const car2 = {
  make: "Mercedes",
  model: "EClass",
  year: 2005,
  type: "Sedan",
  price: 8000,
  img: "",
  history: "no damange",
  milage: 130000,
};

describe("Delete/", () => {
  test("Delete all cars", async () => {
    return request(app)
      .delete("/")
      .then(() => {
        prisma.car.count().then((count) => {
          expect(count).toBe(0);
        });
      });
  });
});

describe("POST/", () => {
  test("Create a car", async () => {
    return request(app)
      .post("/")
      .send(car1)
      .then(({ body }: any) => {
        prisma.car.count().then((count) => {
          expect(count).toBe(1);
        });
      });
  });
});

describe("POST/", () => {
  test("Create a car", async () => {
    return request(app)
      .post("/")
      .send(car2)
      .then(({ body }: any) => {
        prisma.car.count().then((count) => {
          expect(count).toBe(2);
        });
      });
  });
});

describe("GET/", () => {
  test("GET car with filter", async () => {
    return request(app)
      .get("/?make=Mercedes")
      .then((res: any) => {
        const [result] = JSON.parse(res.text);
        expect(result.model).toBe("EClass");
      });
  });
});

describe("GET/", () => {
  test("GET car with filter", async () => {
    return request(app)
      .get("/?model=Yaris")
      .then((res: any) => {
        const [result] = JSON.parse(res.text);
        expect(result.make).toBe("Toyota");
      });
  });
});

describe("PUT/", () => {
  test("Edit car", async () => {
    const car = await prisma.car.findFirst({ where: { make: "Toyota" } });
    if (car) car.history = "1 Accident";
    return request(app)
      .put(`/${car?.id}`)
      .send(car)
      .then((res: any) => {
        const result = JSON.parse(res.text);
        expect(result.history).toBe("1 Accident");
      });
  });
});
