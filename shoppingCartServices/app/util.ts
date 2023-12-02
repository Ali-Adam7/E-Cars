import { Cart } from "@prisma/client";
const catalogURL = process.env.CATALOG_URL || "http://localhost:8003";

export const isValidationError = (error: any) => {
  return String(error).includes("PrismaClientValidationError");
};

export const getCars = async (cart: Cart[]) => {
  const cars: any[] = [];
  for (let i = 0; i < cart.length; i++) {
    const res = await fetch(`${catalogURL}/${cart[i].carID}`);
    const car = await res.json();
    car.quantity = cart[i].quantity;
    cars.push(car);
  }
  return cars;
};
