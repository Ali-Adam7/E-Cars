"use server";
import ReviewsClient from "./ReviewsClient";
import CarClient from "./CarClient";
import { getCarById, getRecommendation } from "@/api/catalog";
import { recordView } from "@/api/analytics";
import Products from "../Products";
import { redirect } from "next/navigation";
export default async function CarID({ params }: { params: { slug: string } }) {
  const id = parseInt(params.slug);
  const car = (await getCarById(id)) as Car;
  if (!car) redirect("/cars");
  recordView(id);
  const recommend = await getRecommendation(car);

  const filters = [
    { name: "Make", description: `${car?.make}` },
    { name: "Model", description: `${car?.model}` },
    { name: "Type", description: `${car?.type}` },
    { name: "Year", description: `${car?.year}` },
    { name: "Milage", description: `${car?.milage} Km` },
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
            {filters.map((filter) => (
              <div key={filter.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">{filter.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">{filter.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <img src={`/cars/${id}.jpg`} alt="" className="rounded-xl bg-gray-100 xl:ml-20" />
        </div>
        <CarClient car={car} />
      </div>

      <div className="bg-white ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <div className="grid grid-cols-4 ">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ">Reviews</h2>
            </div>
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8   sm:mt-5 sm:pt-5 lg:mx-0 lg:max-w-none lg:grid-cols-1">
            <ReviewsClient car={car} />

            <div className="bg-white mb-10">
              <div className="mx-auto max-w-7xl ">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-5 sm:pt-15 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                  {car?.reviews?.map((post: Review) => {
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
                            <div className="font-semibold text-gray-900">
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
                            </div>
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

            <div className="grid grid-cols-1 justify-self-start">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ">Similar Cars</h2>
            </div>
          </div>
        </div>
      </div>
      <Products products={recommend} />
    </div>
  );
}
