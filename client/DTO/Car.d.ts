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
