"use client";
import { Fragment, useEffect, useState, useCallback } from "react";
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import store, { RootState } from "../../store/store";
import AccountBar from "./AccountBar";
import { Transition, Dialog } from "@headlessui/react";
import { initialize, removeFromCart } from "@/store/cartSlice";
export default function Navbar() {
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);
  console.log("cart ");
  console.log(cart);
  const getCart = async () => {
    if (user.id) {
      const res = await fetch("/api/cart", {
        cache: "no-store",
        headers: { endPoint: "getCart", id: String(user.id) },
      });
      const response = await res.json();
      if (response.status == 404) {
        store.dispatch(initialize([]));
      } else {
        store.dispatch(initialize(response));
      }
    }
  };
  // get items from DB:
  useEffect(() => {
    getCart();
  }, []);

  const remove = async (car: Car) => {
    if (user.id) {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        cache: "no-store",
        headers: { endPoint: "deleteFromCart", cartID: String(user.id), carID: String(car.id) },
      });
      if (res.status === 204) {
        return;
      }
    }
    store.dispatch(removeFromCart(car));
  };

  const [showCart, setShowCart] = useState<boolean>(false);
  return (
    <nav aria-label="Top" className="bg-white mx-auto  px-4 sm:px-6 lg:px-8 ">
      <div className="bg-white ">
        <div className="bg-white flex h-16 items-center">
          {/* Logo */}

          <div className="flex 	 ">
            <a href="/">
              <span className="sr-only">Your Company</span>
              <img className="h-16 " src="/logo.png" alt="" />
            </a>
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 ml-6">
              <a href="/cars" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                Shop
              </a>
              <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
              <a href="/cars/hotdeals" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                Deals
              </a>
              <span className="h-6 w-px bg-gray-200" aria-hidden="true" />

              <a href="/calculator" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                Loan Calculator
              </a>
            </div>
          </div>

          <div className=" ml-auto flex items-center">
            {user.firstName ? (
              <AccountBar />
            ) : (
              <div className=" flex flex-1 items-center justify-end space-x-4">
                <a href="/SignIn" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                  Sign in
                </a>
                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                <a href="/Register" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                  Register
                </a>
              </div>
            )}

            <div className="hidden lg:ml-8 lg:flex">
              <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                <img
                  src="https://tailwindui.com/img/flags/flag-canada.svg"
                  alt=""
                  className="block h-auto w-5 flex-shrink-0"
                />
                <span className="ml-3 block text-sm font-medium">CAD</span>
              </a>
            </div>
            {/* Cart */}
            <div className=" ml-4 flow-root lg:ml-6">
              <div
                className="group -m-2 flex items-center p-2"
                onClick={() => {
                  setShowCart(true);
                }}
              >
                <ShoppingBagIcon
                  className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                  {cart?.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)}
                </span>
                <span className="sr-only">items in cart, view bag</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Transition.Root show={showCart} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowCart}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setShowCart(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {cart?.map((car: Car) => (
                                <li key={car.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img src={car.img} className="h-full w-full object-cover object-center" />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={`/cars/${car.id}`}>{car.model}</a>
                                        </h3>
                                        <p className="ml-4">${car.price}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">{car.milage} Km</p>
                                      <p className="mt-1 text-sm text-gray-500"> Quantity: {car.quantity} </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={async () => await remove(car)}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>
                            $
                            {cart?.reduce(
                              (accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity,
                              0
                            )}
                          </p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                          <a
                            href="#"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Checkout
                          </a>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => setShowCart(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>{" "}
    </nav>
  );
}
