export interface car { // define what a car is
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

export interface filter { // define the filter of a car
  model?: string;
  make?: string;
  type?: string;
  price?: number;
  year?: string;
  milage?: number;
}
