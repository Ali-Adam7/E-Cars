"use client";

import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon as XMarkIconMini } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import store, { RootState } from "@/store/store";
import { removeCar } from "@/api/cart";
import { removeFromCart } from "@/store/cartSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Example() {
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);
  const Router = useRouter();

  const remove = async (car: Car) => {
    if (user.id) {
      const res = await removeCar(user.id, car.id, user.token);
      if (res != 202) return;
    }

    store.dispatch(removeFromCart(car));
  };

  return (
    <div className="bg-white h-screen">
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {cart.map((product, productIdx) => (
                <li key={product.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={product.img}
                      alt={product.img}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <Link href={`/car/${product.id}`} className="font-medium text-gray-700 hover:text-gray-800">
                              {product.make} {product.model}
                            </Link>
                          </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                          <p className="text-gray-500">{product.type}</p>

                          <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{product.year}</p>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">${product.price}</p>
                        <p className="mt-1 text-sm font-= text-gray-900">Quantity: {product.quantity}</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <div className="absolute right-0 top-0">
                          <button
                            onClick={() => remove(product)}
                            type="button"
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remove</span>
                            <XMarkIconMini className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 flex space-x-2 text-sm text-gray-700"></p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Order total</dt>
                <dd className="text-base font-medium text-gray-900">
                  ${" "}
                  {cart?.reduce(
                    (accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price,
                    0
                  )}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                onClick={() => {
                  if (user.id) {
                    Router.push("/order");
                  } else {
                    Router.push("/order/guest");
                  }
                }}
                disabled={!cart.length}
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Checkout
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
