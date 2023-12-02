import Link from "next/link";

export default function CarPictures() {
  const incentives = [
    {
      name: "24/7 Customer Support",
      description: "Our AI chat widget is powered by a naive series of if/else statements. Guaranteed to irritate.",
      imageSrc: "https://tailwindui.com/img/ecommerce/icons/icon-chat-light.svg",
    },
    {
      name: "Fast Shopping Cart",
      description: "Look how fast that cart is going. What does this mean for the actual experience? I don't know.",
      imageSrc: "https://tailwindui.com/img/ecommerce/icons/icon-fast-checkout-light.svg",
    },
    {
      name: "Hot Deals",
      description: "Buy them for your friends, especially if they don't like our store. Free money for us, it's great.",
      imageSrc: "https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg",
    },
  ];
  const faqs = [
    {
      question: "How do I order a car?",
      answer:
        "You go to the cars tab and you explore several new and unique options that we offer in our store front then choose one and add it to cart",
    },
    {
      question: "I have a question about ordering what do I do?",
      answer: " use our unique chat bot Tom which will provide you with answers to your questions",
    },
    {
      question: "can I cancel an order?",
      answer: " No, the future is now.",
    },

    {
      question: "  How can I see hot deals?  ",
      answer:
        " Click on 'Hot Deals' in the navigation bar to see what new and exciting deals we are offering this week!",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-white mt-10">
      <div className="bg-gray-100">
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
              Trusted by the world’s most innovative teams
            </h2>
            <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              <img
                className="col-span-2 max-h-24 w-full object-contain lg:col-span-1"
                src="https://i.ebayimg.com/images/g/-VsAAOSw05leGH2b/s-l1600.png"
                alt="Transistor"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-24 w-full object-contain lg:col-span-1"
                src="https://i.ebayimg.com/images/g/lewAAOSwPjZdkPEj/s-l1200.webp"
                alt="Reform"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-24 w-full object-contain lg:col-span-1"
                src="data:image/png;base64,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"
                alt="Tuple"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-24 w-full object-contain sm:col-start-2 lg:col-span-1"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Lucid_Motors_logo.svg/2560px-Lucid_Motors_logo.svg.png"
                alt="SavvyCal"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 col-start-2 max-h-24 w-full object-contain sm:col-start-auto lg:col-span-1"
                src="https://s2-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/948/400/original/XPENG.png?1645141546"
                alt="Statamic"
                width={158}
                height={48}
              />
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="relative bg-gray-900">
            {/* Decorative image and overlay */}
            <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
              <img
                src="https://ts2.space/wp-content/uploads/2023/08/mfrack_cinematic_photo_of_man_and_future_of_electric_cars_a90cbf6c-eb64-4dd5-94d0-285c54539539.jpeg"
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-50" />

            <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
              <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">New Deals Are Here</h1>
              <p className="mt-4 text-xl text-white"></p>
              <Link
                href="/cars/hotdeals"
                className="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
              >
                Shop Deals
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-gray-100">
          <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
            <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
              <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
                <div>
                  <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                    We built our business on great customer service
                  </h2>
                  <p className="mt-4 text-gray-500">
                    At the beginning at least, but then we realized we could make a lot more money if we kinda stopped
                    caring about that. Our new strategy is to write a bunch of things that look really good in the
                    headlines, then clarify in the small print but hope people dt actually read it.
                  </p>
                </div>
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src="https://takechargemobile.app/wp-content/uploads/2023/04/image_1330926878-1024x576.webp"
                    alt=""
                    className="object-cover object-center"
                  />
                </div>
              </div>
              <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                {incentives.map((incentive) => (
                  <div key={incentive.name} className="sm:flex lg:block">
                    <div className="sm:flex-shrink-0">
                      <img className="h-16 w-16" src={incentive.imageSrc} alt="" />
                    </div>
                    <div className="mt-4 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
                      <h3 className="text-sm font-medium text-gray-900">{incentive.name}</h3>
                      <p className="mt-2 text-sm text-gray-500">{incentive.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:px-8 lg:py-40">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
              <p className="mt-4 text-base leading-7 text-gray-600">
                Can’t find the answer you’re looking for? Reach out to our{" "}
                <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  customer support
                </Link>{" "}
                team.
              </p>
            </div>
            <div className="mt-10 lg:col-span-7 lg:mt-0">
              <dl className="space-y-10">
                {faqs.map((faq) => (
                  <div key={faq.question}>
                    <dt className="text-base font-semibold leading-7 text-gray-900">{faq.question}</dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
