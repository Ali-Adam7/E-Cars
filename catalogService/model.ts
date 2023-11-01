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

export interface filter {
  model?: string;
  make?: string;
  type?: string;
  price?: number;
  year?: string;
  milage?: number;
}
