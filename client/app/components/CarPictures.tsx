import Link from "next/link";

export default function CarPictures() {
  const incentives = [
    {
      name: "Free Shipping",
      description:
        "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
      imageSrc: "https://tailwindui.com/img/ecommerce/icons/icon-delivery-light.svg",
    },
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
      <div className="mb-48 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Find Your Next Electric Car</h1>
            <p className=" text-xl text-gray-500">
              This year, our new collection will shelter you from the harsh elements of a world that if you live or die.
            </p>
          </div>
          <div>
            <div className="">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8  mt-10 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          src="https://www.topgear.com/sites/default/files/2022/07/2_2.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://cdn.osvehicle.com/how_much_have_electric_cars_increased_in_.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-2">
                      <div className="h-50 w-44 overflow-hidden rounded-lg ">
                        <img
                          src="https://i.ebayimg.com/images/g/IooAAOSwPxNgf~Cj/s-l1200.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://wallpapers.com/images/hd/tesla-logo-4k-6hwax2eqejo0ha74.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://static.vecteezy.com/system/resources/previews/020/502/710/non_2x/bmw-brand-logo-symbol-blue-design-germany-car-automobile-illustration-with-black-background-free-vector.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://www.topgear.com/sites/default/files/2023/06/Cybertruck_94.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://www.mercedes-benz.ca/content/dam/mb-nafta/ca/eq/design/eqs580x4/interior/hotspots/MBCAN-MY23-EQS-SUV-TP-Hyperscreen-XL.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                prefetch={false}
                href="/cars"
                className="inline-block mt-10 rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
              >
                Browse Cars
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
            {incentives.map((incentive) => (
              <div key={incentive.name}>
                <img src={incentive.imageSrc} alt="" className="h-24 w-auto" />
                <h3 className="mt-6 text-sm font-medium text-gray-900">{incentive.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{incentive.description}</p>
              </div>
            ))}
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
