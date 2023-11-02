export interface car {
  id: number;
  model: string;
  make: string;
  type: string;
  price: number;
  img: string;
  year: number;
  history: string;
  milage: number;
}

export interface cart {
  cartId: number; // this is the cart ID to connect it with user ID after
  carsIds: car[];
  beforeTax: number;
}
