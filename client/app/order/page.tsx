"use client";

import { recordOrder } from "@/fetchHelper/analytics";
import { guestOrder, submitOrder } from "@/fetchHelper/order";
import { emptyCart } from "@/store/cartSlice";
import { setOrder } from "@/store/orderSlice";
import store, { RootState } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Example() {
  const Router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);

  const fname = useRef<string>(user.firstName);
  const lname = useRef<string>(user.lastName);
  const address = useRef<string>(user.address);
  const email = useRef<string>(user.email);
  const card = useRef<string>();
  const ccv = useRef<string>();
  const expiry = useRef<string>();

  const order = async (event: any) => {
    event.preventDefault();
    let res;
    if (user.id) res = await submitOrder(user.id, user.token);
    else res = await guestOrder(cart);

    if (res === "Success" || res === "Accepted") {
      toast.success("Success");
      store.dispatch(setOrder(cart));
      cart.forEach((car) => {
        recordOrder(car.id);
      });
      setTimeout(() => {
        Router.replace(`/order/confirmation/?address=${address.current}&name=${fname.current + " " + lname.current}`);
        store.dispatch(emptyCart());
      }, 1000);
    } else toast.error(res);
  };
  return (
    <div className="mx-auto max-w-3xl py-12 px-8  ">
      <Toaster position="top-center" reverseOrder={false} />

      <form onSubmit={order}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">Confirm Details</h2>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  First name
                </label>
                <div className="mt-2">
                  <input
                    required
                    type="text"
                    name="first-name"
                    id="first-name"
                    placeholder={fname.current}
                    onChange={(val) => (fname.current = val.target.value)}
                    disabled={user.firstName ? true : false}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    required
                    type="text"
                    name="last-name"
                    id="last-name"
                    placeholder={lname.current}
                    disabled={user.lastName ? true : false}
                    onChange={(val) => (lname.current = val.target.value)}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    required
                    id="email"
                    name="email"
                    type="email"
                    onChange={(val) => (email.current = val.target.value)}
                    autoComplete="email"
                    placeholder={email.current}
                    disabled={user.email ? true : false}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    required
                    type="text"
                    name="street-address"
                    id="street-address"
                    onChange={(val) => (address.current = val.target.value)}
                    placeholder={address.current}
                    disabled={user.address ? true : false}
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Cars</h2>
            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cart?.map((car: Car) => (
                    <li key={car.id} className="flex py-6">
                      <div className="h-1/4 w-1/4 0 overflow-hidden rounded-md border border-gray-200">
                        <img src={car.img} className="h-full w-full" />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link href={`/cars/${car.id}`}>{car.make}</Link>
                            </h3>
                            <p className="ml-4">${car.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {car.model} {car.year}
                          </p>
                          <p className="mt-1 text-sm text-gray-500"> Quantity: {car.quantity} </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex"></div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Payment</h2>

            <div>
              <fieldset>
                <div className="mt-2 -space-y-px rounded-md bg-white shadow-sm">
                  <div>
                    <label htmlFor="card-number" className="sr-only">
                      Card number
                    </label>
                    <input
                      type="text"
                      name="card-number"
                      id="card-number"
                      className="relative block w-full rounded-none rounded-t-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Card number"
                    />
                  </div>
                  <div className="flex -space-x-px">
                    <div className="w-1/2 min-w-0 flex-1">
                      <label htmlFor="card-expiration-date" className="sr-only">
                        Expiration date
                      </label>
                      <input
                        type="text"
                        name="card-expiration-date"
                        id="card-expiration-date"
                        className="relative block w-full rounded-none rounded-bl-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="MM / YY"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <label htmlFor="card-cvc" className="sr-only">
                        CVC
                      </label>
                      <input
                        type="text"
                        name="card-cvc"
                        id="card-cvc"
                        className="relative block w-full rounded-none rounded-br-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="CVC"
                      />
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset className="mt-6 bg-white">
                <legend className="block text-sm font-medium leading-6 text-gray-900">Billing address</legend>
                <div className="mt-2 -space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="country" className="sr-only">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="relative block w-full rounded-none rounded-t-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="postal-code" className="sr-only">
                      ZIP / Postal code
                    </label>
                    <input
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autoComplete="postal-code"
                      className="relative block w-full rounded-none rounded-b-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="ZIP / Postal code"
                    />
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            onClick={() => {
              Router.replace("/");
            }}
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            value="Submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
