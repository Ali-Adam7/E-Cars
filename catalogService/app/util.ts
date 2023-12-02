import { Car } from "@prisma/client";

export const createPrismFilters = (query: Partial<Car>) => {
  const queryFilters = { ...query } as Partial<Car>;
  if (queryFilters.year) queryFilters.year = parseInt(String(query.year));
  if (queryFilters.milage) queryFilters.milage = parseInt(String(query.milage));
  if (queryFilters.price) queryFilters.price = parseInt(String(query.price));
  const makeFilter = queryFilters.make?.split(",") as string[];
  const typeFilter = queryFilters.type?.split(",") as string[];
  const history = Boolean(parseInt(String(queryFilters.history)));
  const filter = { ...queryFilters, make: { in: makeFilter }, type: { in: typeFilter }, history: history };
  return filter;
};
export const isValidationError = (error: any) => {
  return String(error).includes("PrismaClientValidationError");
};
