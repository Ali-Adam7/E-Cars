"use server";
import { addToCart } from "@/store/cartSlice";
import store, { RootState } from "@/store/store";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReviewsClient from "./ReviewsClient";
import CarClient from "./CarClient";

export default async function Page({ params }: { params: { slug: string } }) {
  const id = params.slug;

  const carRes = await fetch(`https://localhost:3000/api/car`, {
    method: "GET",
    headers: { endPoint: "ID", id: id },
    cache: "no-store",
  });
  if (carRes.status != 200) {
    redirect("/cars");
  }

  const car = (await carRes.json()) as Car;
  const reviews: Review[] = await (
    await fetch(`https://localhost:3000/api/car`, { headers: { endPoint: "Reviews", id: id }, cache: "no-store" })
  ).json();

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
        <CarClient car={car} />
      </div>

      <div className="bg-white ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <div className="grid grid-cols-4 ">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ">Reviews</h2>
            </div>

            <p className="mt-2 text-lg leading-8 text-gray-600">See what customers say about this car</p>
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8   sm:mt-5 sm:pt-5 lg:mx-0 lg:max-w-none lg:grid-cols-1">
            <ReviewsClient car={car} />

            <div className="bg-white mb-10">
              <div className="mx-auto max-w-7xl ">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-5 sm:pt-15 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                  {reviews?.map((post: Review) => {
                    const stars = new Array(post.rating).fill(1);
                    return (
                      <article key={post.reviewID} className="flex max-w-xl flex-col items-start justify-between">
                        <div className="relative mt-8 flex items-center gap-x-4">
                          <img
                            src={
                              "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
                            }
                            alt=""
                            className="h-10 w-10 rounded-full bg-gray-50"
                          />
                          <div className="text-sm leading-6">
                            <p className="font-semibold text-gray-900">
                              <div className="group relative ">
                                <div className="rating">
                                  {stars.map((star, i) => {
                                    return (
                                      <input
                                        key={i}
                                        type="radio"
                                        name="rating-2"
                                        className="mask mask-star-2 bg-orange-400"
                                      />
                                    );
                                  })}
                                </div>
                              </div>
                              <span className="absolute inset-0" />
                              {post.firstName}
                            </p>
                            <div className="flex items-start text-xs">
                              <div className="relative z-10  rounded-xl bg-gray-100  px-1 py-1.5  font-medium text-black ">
                                {post.review}
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
