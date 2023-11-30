"use client";
import { recordCart } from "@/fetchHelper/analytics";
import { addCar } from "@/fetchHelper/cart";
import { addToCart } from "@/store/cartSlice";
import store, { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

export default function CarClient({ car }: any) {
  const user = useSelector((state: RootState) => state.user);
  const add = async (car: Car) => {
    recordCart(car.id);
    if (user.id) await addCar(user.id, car.id, 1, user.token);
    store.dispatch(addToCart({ ...car, quantity: 1 }));
    toast.success("Car Added");
  };
  return (
    <div className="justify-self-center  lg:justify-self-start	 ">
      <Toaster position="top-center" reverseOrder={false} />
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
