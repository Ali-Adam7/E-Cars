interface Car {
  id: number;
  model: String;
  make: String;
  description: string;
  type: string;
  price: number;
  img: string;
  year: number;
  milage: number;
  quantity: number;
  deal: boolean;
  reviews?: Review[];
}
interface User {
  token: string;
  id?: number;
  email: string;
  createdAt?: Date;
  firstName: string;
  lastName: string;
  address: string;
  password?: string;
  role?: string;
}
interface Review {
  reviewID?: number;
  review: string;
  rating: number;
  carID: number;
  firstName?: number;
  time: Date;
}

interface Order {}
