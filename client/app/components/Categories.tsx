const callouts = [
  {
    name: "Sedan",
    description: "You will love driving it",
    imageSrc:
      "https://media.ed.edmunds-media.com/tesla/model-s/2019/oem/2019_tesla_model-s_sedan_performance_fq_oem_1_1600.jpg",
    imageAlt: "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
    href: "/cars?type=sedan",
  },
  {
    name: "SUV",
    description: "For Room and Comfort",
    imageSrc:
      "https://assets-eu-01.kc-usercontent.com/3b3d460e-c5ae-0195-6b86-3ac7fb9d52db/1ce5ecec-cb1e-4be7-918f-b1d89e2967f9/Tesla%20Model%20X%20%283%29.jpg?fm=jpg&auto=format",
    imageAlt: "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
    href: "/cars?type=suv",
  },
  {
    name: "Trucks",
    description: "Built for Life on the Road, Heavy-Duty Trucks",
    imageSrc:
      "https://hips.hearstapps.com/hmg-prod/images/tesla-cybertruck-101-1574400035.jpg?crop=0.669xw:1.00xh;0.167xw,0&resize=640:*",
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "/cars?type=truck",
  },
];

export default function Example() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-20">
          <h2 className="text-3xl font-bold text-gray-900">Car Types:</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <a href={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">{callout.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
