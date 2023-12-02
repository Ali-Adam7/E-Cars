"use client";
import { Fragment, useEffect, useState, useCallback } from "react";
import {
  Bars3Icon,
  ChevronDownIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  MagnifyingGlassIcon,
  PlayCircleIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import store, { RootState } from "../../store/store";
import { Transition, Dialog, Popover } from "@headlessui/react";
import { emptyCart, initialize, removeFromCart } from "@/store/cartSlice";
import { getCart, removeCar } from "@/api/cart";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logOut } from "@/store/userSlice";

const callsToAction = [{ name: "Sign Out", href: "#", icon: PlayCircleIcon }];

export default function Navbar() {
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);
  const Router = useRouter();
  const logout = () => {
    store.dispatch(emptyCart());
    store.dispatch(logOut());
    Router.replace("/");
  };

  const solutions = [{ name: "Account", description: "", href: "#", icon: FingerPrintIcon }];
  if (user.role == "user") {
    solutions.push({ name: "Shopping Cart", description: "", href: "/order/cart", icon: CursorArrowRaysIcon });
    solutions.push({ name: "Past Orders", description: "", href: "/order/pastorders", icon: CursorArrowRaysIcon });
  } else {
    solutions.push({ name: "Usuage Report", description: "", href: "/analytics/usuage", icon: CursorArrowRaysIcon });
    solutions.push({ name: "Sales Report", description: "", href: "/analytics/sale", icon: CursorArrowRaysIcon });
  }

  const initializeCart = async () => {
    if (user.id) {
      const cart = await getCart(user.id, user.token);
      store.dispatch(initialize(cart));
    }
  };
  // get items from DB:
  useEffect(() => {
    initializeCart();
  }, []);

  const remove = async (car: Car) => {
    if (user.id) {
      const res = await removeCar(user.id, car.id, user.token);
      if (res !== 202) return;
    }
    store.dispatch(removeFromCart(car));
  };

  const [showCart, setShowCart] = useState<boolean>(false);
  try {
    return (
      <nav aria-label="Top" className="bg-white mx-auto  px-4 sm:px-6 lg:px-8 ">
        <div className="bg-white ">
          <div className="bg-white flex h-16 items-center">
            {/* Logo */}

            <div className="flex 	 ">
              <Link href="/">
                <span className="sr-only">Your Company</span>
                <img className="h-16 " src="/logo.png" alt="" />
              </Link>
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 ml-6">
                <Link href="/cars" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                  Shop
                </Link>
                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                <Link href="/cars/hotdeals" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                  Deals
                </Link>
                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />

                <Link href="/calculator" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                  Loan Calculator
                </Link>
              </div>
            </div>

            <div className=" ml-auto flex items-center">
              {user.firstName ? (
                <Popover className="relative">
                  <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                    <span>{user.firstName}</span>
                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                      <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                        <div className="p-4">
                          {solutions.map((item) => (
                            <div
                              key={item.name}
                              className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                            >
                              <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                <item.icon
                                  className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                  aria-hidden="true"
                                />
                              </div>
                              <div>
                                <Link href={item.href} className="font-semibold text-gray-900">
                                  {item.name}
                                  <span className="absolute inset-0" />
                                </Link>
                                <p className="mt-1 text-gray-600">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-1 divide-x  divide-gray-900/5 bg-gray-50">
                          {callsToAction.map((item) => (
                            <button
                              key={item.name}
                              onClick={logout}
                              className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                            >
                              <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                              {item.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              ) : (
                <div className=" flex flex-1 items-center justify-end space-x-4">
                  <Link href="/signin" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Sign in
                  </Link>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <Link href="/register" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Register
                  </Link>
                </div>
              )}

              <div className="hidden lg:ml-8 lg:flex">
                <Link href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                  <img
                    src="https://tailwindui.com/img/flags/flag-canada.svg"
                    alt=""
                    className="block h-auto w-5 flex-shrink-0"
                  />
                  <span className="ml-3 block text-sm font-medium">CAD</span>
                </Link>
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
                          <div className="mt-6 items-center flex  justify-center">
                            <button
                              onClick={() => {
                                setShowCart(false);

                                if (user.id) {
                                  Router.push("/order");
                                } else {
                                  Router.push("/order/guest");
                                }
                              }}
                              disabled={!cart.length}
                              className=" rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                              Checkout
                            </button>
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
  } catch {
    store.dispatch(initialize([]));
  }
}
