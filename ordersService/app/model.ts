import { PO, POItem } from "@prisma/client";

export interface Car {
  id: number;
  price: number;
  quantity: number;
}
export type fullOrder = {
  POid: number;
  vid: number;
  price: number;
  quantity: number;
  items: {
    vid: number;
    userID: number;
    status: string;
    quantity: string;
  }[];
};
