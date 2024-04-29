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
