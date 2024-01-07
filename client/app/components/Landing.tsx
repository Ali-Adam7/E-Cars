import Link from "next/link";
import Chat from "./Chat";

const callouts = [
  {
    name: "Sedan",
    description: "You will love driving it",
    imageSrc: "/sedan.jpg",
    imageAlt: "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
    href: `cars?type=Sedan`,
  },
  {
    name: "SUV",
    description: "For Room and Comfort",
    imageSrc: "/suv.jpg",
    imageAlt: "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
    href: `cars?type=SUV`,
  },
  {
    name: "Trucks",
    description: "Built for Life on the Road, Heavy-Duty Trucks",
    imageSrc: "truck.jpg",
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: `cars?type=Truck`,
  },
];
export default function Landing() {
  return (
    <div className="relative bg-white">
      {/* Background image and overlap */}
      <Chat />
      <div aria-hidden="true" className="absolute inset-0 hidden sm:flex sm:flex-col">
        <div className="relative w-full flex-1 bg-gray-800">
          <div className="absolute inset-0 overflow-hidden">
            <img src="/background.jpg" alt="" className="h-full w-full object-cover object-center" />
          </div>
          <div className="absolute inset-0 bg-gray-900 opacity-50" />
        </div>
        <div className="h-32 w-full bg-white md:h-40 lg:h-48" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8">
        {/* Background image and overlap */}
        <div aria-hidden="true" className="absolute inset-0 flex flex-col sm:hidden">
          <div className="relative w-full flex-1 bg-gray-800">
            <div className="absolute inset-0 overflow-hidden">
              <img src="/mobile_background.jpg" alt="" className="h-full w-full object-cover object-center" />
            </div>
            <div className="absolute inset-0 bg-gray-900 opacity-50" />
          </div>
          <div className="h-48 w-full bg-white" />
        </div>
        <div className="relative py-32">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">Welcome to E-Cars</h1>
          <div className="mt-4 sm:mt-6">
            <Link
              href="/cars"
              className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 font-medium text-white hover:bg-indigo-700"
            >
              Shop
            </Link>
          </div>
        </div>
      </div>

      <section aria-labelledby="collection-heading" className="relative -mt-96 sm:mt-0">
        <h2 id="collection-heading" className="sr-only">
          Collections
        </h2>
        <div className="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 sm:px-6 lg:gap-x-8 lg:px-8">
          {callouts.map((collection) => (
            <div
              key={collection.name}
              className="group relative h-96 rounded-lg bg-white shadow-xl sm:aspect-h-5 sm:aspect-w-4 sm:h-auto"
            >
              <div>
                <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                    <img
                      src={collection.imageSrc}
                      alt={collection.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                </div>
                <div className="absolute inset-0 flex items-end rounded-lg p-6">
                  <div>
                    <p aria-hidden="true" className="text-sm text-white">
                      {collection.description}
                    </p>
                    <h3 className="mt-1 font-semibold text-white">
                      <Link href={collection.href}>
                        <span className="absolute inset-0" />
                        {collection.name}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
