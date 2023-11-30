import Link from "next/link";
export default function Deals(params: any) {
  return (
    <div className="bg-white h-full">
      <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-3 lg:max-w-7xl lg:px-8 bg-white">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {params?.products?.map((product: any) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-5 aspect-w-8 w-full overflow-hidden rounded-lg bg-gray-200 ">
                <img src={product.img} className="h-full w-full  object-center group-hover:opacity-75" />
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/cars/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.make}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.model} {product.year}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">${product.price}</p>
                  <p className="text-sm font-medium text-gray-900">{product.milage} km</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
