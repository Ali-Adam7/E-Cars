"use client";
import { addToCart } from "@/store/cartSlice";
import store, { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Page({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const id = params.slug;
  const [car, setCar] = useState<Car>();
  const [reviews, setReviews] = useState<Review[]>();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const getInfo = async () => {
      const carRes = await fetch(`/api/car`, { method: "GET", headers: { endPoint: "ID", id: id }, cache: "no-store" });
      if (carRes.status === 404) {
        router.replace("/");
      }

      const car = (await carRes.json()) as Car;
      const reviews: Review[] = await (
        await fetch(`/api/car`, { headers: { endPoint: "Reviews", id: id }, cache: "no-store" })
      ).json();
      setCar(car);
      setReviews(reviews);
    };
    getInfo();
  }, []);

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

  const features = [
    { name: "Make", description: `${car?.make}` },
    { name: "Model", description: `${car?.model}` },
    { name: "Type", description: `${car?.type}` },
    { name: "Year", description: `${car?.year}` },
    { name: "Milage", description: `${car?.milage}` },
    { name: "Price", description: `$${car?.price}` },
  ];

  return (
    <div className="bg-white">
      <div className=" mx-auto grid max-w-2xl grid-cols-1 items-end   gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-24 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {car?.make + " " + car?.model}
          </h2>
          <p className="mt-4 text-gray-500">{car?.description}</p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <img src={car?.img} alt="" className="rounded-xl bg-gray-100 xl:ml-20" />
        </div>
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
      </div>

      <div className="bg-white ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Reviews</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">See what customers say about this car</p>
          </div>

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {reviews?.map((review: Review) => (
              <article key={review.reviewID} className="flex max-w-xl flex-col items-start justify-between">
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <div>
                      <span className="absolute inset-0" />
                      {review.rating}/5
                    </div>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{review.review}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
