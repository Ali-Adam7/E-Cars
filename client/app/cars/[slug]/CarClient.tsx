"use client";
import { addToCart } from "@/store/cartSlice";
import store, { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function Page({ car }: any) {
  const user = useSelector((state: RootState) => state.user);

  const add = async (car: Car) => {
    if (user.id) {
      const carRes = await fetch(`/api/cart`, {
        method: "POST",
        headers: { endPoint: "addToCart", cartID: String(user.id), carID: String(car.id) },
        cache: "no-store",
      });
    }
    store.dispatch(addToCart({ ...car, quantity: 1 }));
  };
  return (
    <div className="justify-self-center  lg:justify-self-start	 ">
      <button
        className="flex 	 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={async () => {
          if (car) await add(car);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
