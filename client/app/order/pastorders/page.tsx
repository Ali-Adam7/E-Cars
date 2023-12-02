"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getOrders } from "@/api/order";

export default function Example() {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state: RootState) => state.user);
  const get = async () => {
    if (user?.id) {
      const pastOrders = await getOrders(user.id, user.token);
      setOrders(pastOrders);
    }
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <div className="bg-white h-full">
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="max-w-xl">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
          <p className="mt-1 text-sm text-gray-500">Check the status of recent orders</p>
        </div>

        <section aria-labelledby="recent-heading" className="mt-16">
          <h2 id="recent-heading" className="sr-only">
            Recent orders
          </h2>

          <div className="space-y-20">
            {orders.map((order: any) => (
              <div key={order.id}>
                <h3 className="sr-only">
                  Order placed on <time dateTime="Nov">{"Nov"}</time>
                </h3>

                <div className="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                  <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                    <div className="flex justify-between pt-6 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">Order #{order.id} </dt>
                    </div>
                    <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                      <dt>Total amount</dt>
                      <dd className="sm:mt-1">
                        $
                        {order.items?.reduce(
                          (accumulator: any, currentValue: { price: number }) => accumulator + currentValue.price,
                          0
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>

                <table className="mt-4 w-full text-gray-500 sm:mt-6">
                  <caption className="sr-only">Products</caption>
                  <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                    <tr>
                      <th scope="col" className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3">
                        Product
                      </th>
                      <th scope="col" className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell">
                        Price
                      </th>
                      <th scope="col" className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell">
                        Quantity
                      </th>
                      <th scope="col" className="hidden py-3 pr-8 font-normal sm:table-cell">
                        Status
                      </th>
                      <th scope="col" className="w-0 py-3 text-right font-normal">
                        Info
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                    {order.items.map((product: any) => (
                      <tr key={product.id}>
                        <td className="py-6 pr-8">
                          <div className="flex items-center">
                            <img
                              src={product.img}
                              alt={product.img}
                              className="mr-6 h-16 w-16 rounded object-cover object-center"
                            />
                            <div>
                              <div className="font-medium text-gray-900">
                                {product.make} {product.model} {product.year}
                              </div>
                              <div className="mt-1 sm:hidden">${product.price}</div>
                            </div>
                          </div>
                        </td>
                        <td className="hidden py-6 pr-8 sm:table-cell">${product.price}</td>
                        <td className="hidden py-6 pr-8 sm:table-cell">{product.quantity}</td>
                        <td className="hidden py-6 pr-8 sm:table-cell">{order.status}</td>

                        <td className="whitespace-nowrap py-6 text-right font-medium">
                          <a href={`/cars/${product.id}`} className="text-indigo-600">
                            View<span className="hidden lg:inline"> Product</span>
                            <span className="sr-only">, {product.make}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
