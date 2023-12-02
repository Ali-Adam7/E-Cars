export default async function Calculator() {
  async function create(formData: FormData) {
    "use server";
    const car: any = {};

    formData.forEach((v, k) => {
      if (k == "price" || k == "milage" || k == "year" || k == "quantity") car[k] = parseInt(String(v));
      else if (k == "deal" || k == "history") car[k] = Boolean(v);
      else car[k] = v;
    });
    if (!car["deal"]) car["deal"] = false;
    if (!car["history"]) car["history"] = false;
    console.log(car);

    const res = await fetch("http://localhost:8003/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    });
    console.log(res.status);
  }

  return (
    <form action={create} className=" bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Car adder</h2>
      </div>
      <div className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1">
          <div className="m-5">
            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
              Car make
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                id="make"
                name="make"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="m-5">
            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
              Car model
            </label>
            <div className="mt-2.5">
              <input
                id="model"
                name="model"
                type="text"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1">
          <div className="m-5">
            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
              year
            </label>
            <div className="mt-2.5">
              <input
                id="year"
                name="year"
                type="number"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="m-5">
            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
              type
            </label>
            <div className="mt-2.5">
              <input
                id="type"
                name="type"
                type="text"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="m-5">
            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
              price
            </label>
            <div className="mt-2.5">
              <input
                id="price"
                name="price"
                type="number"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="m-5">
            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
              milage
            </label>
            <div className="mt-2.5">
              <input
                id="milage"
                name="milage"
                type="number"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="m-5">
            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
              deal
            </label>
            <div className="mt-2.5">
              <input
                id="deal"
                name="deal"
                type="checkbox"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="m-5">
            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
              description
            </label>
            <div className="mt-2.5">
              <input
                id="description"
                name="description"
                type="text"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="m-5">
            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
              img
            </label>
            <div className="mt-2.5">
              <input
                id="img"
                name="img"
                type="text"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="m-5">
            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
              history
            </label>
            <div className="mt-2.5">
              <input
                id="history"
                name="history"
                type="checkbox"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="m-5">
            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
              quantity
            </label>
            <div className="mt-2.5">
              <input
                id="quantity"
                name="quantity"
                type="number"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Calculate
          </button>
        </div>
      </div>
    </form>
  );
}
