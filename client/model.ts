interface Car {
  id: number;
  model: String;
  make: String;
  description: String;
  type: String;
  price: number;
  img: string;
  year: number;
  milage: number;
  quantity: number;
  deal: boolean;
}
interface User {
  token: string;
  id: number;
  email: String;
  createdAt?: Date;
  firstName: String;
  lastName: String;
  address: String;
}
interface Review {
  reviewID: number;
  review: String;
  rating: number;
  carID: number;
}
interface Cart {
  cars: Car[];
}
interface Order {}
