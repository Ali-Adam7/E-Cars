"use server";
export default async function deals() {
  const carsOnSale = (await (
    await fetch("https://localhost:8003/deals/all", { headers: { rejectUnauthorized: "false" } })
  ).json()) as Car[];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Hot Deals:</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 xl:gap-x-8">
          {carsOnSale?.map((car: Car) => {
            return (
              <a key={car.id} href={`/cars/${car.id}`} className="group">
                <div className="aspect-h-5 aspect-w-8 w-full overflow-hidden rounded-lg bg-gray-200 ">
                  <img src={car.img} className="h-full w-full  object-center group-hover:opacity-75" />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{car.make + " " + car.model + " " + car.year}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">${car.price}</p>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
