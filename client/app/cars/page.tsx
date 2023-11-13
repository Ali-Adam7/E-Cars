"use client";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from "@heroicons/react/20/solid";
import Products from "../components/Products";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const buildQueryString = (params: any) => {
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const arr = queryString.split("");
  arr.unshift("?");

  return arr.join("");
};

const sortOptions = [
  { name: "Price: Low to High", current: false },
  { name: "Price: High to Low", current: false },
  { name: "Milage: Low to High", current: false },
  { name: "Milage: High to Low", current: false },
];

const filters = [
  {
    id: "make",
    name: "Make",
    options: [],
  },
  {
    id: "type",
    name: "Type",
    options: [
      { value: "Sedan", label: "Sedan", checked: false },
      { value: "SUV", label: "SUV", checked: false },
      { value: "Truck", label: "Truck", checked: false },
    ],
  },
  {
    id: "history",
    name: "Accident",
    options: [{ value: "Yes", label: "Yes", checked: false }],
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const router = useRouter();
  const [make] = useState(new Set());
  const [type] = useState(new Set());
  const [accident, setAccident] = useState<number>(0);
  const [sort, setSort] = useState<string>("");
  const [cars, setCars] = useState<Car[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const getCars = async () => {
    const makes = [...make.keys()].join(",");
    const types = [...type.keys()].join(",");
    const params: any = {};
    if (makes) params["make"] = makes;
    if (types) params["type"] = types;
    params["history"] = accident;
    const queryString = buildQueryString(params);
    const res = await (
      await fetch("/api/car", { method: "GET", headers: { query: queryString, endPoint: "filter" } })
    ).json();
    setCars(res);
  };

  useEffect(() => {
    const getMake = async () => {
      try {
        const carMakes = await (
          await fetch("/api/car", {
            cache: "no-store",
            method: "GET",
            headers: {
              endPoint: "make",
            },
          })
        ).json();
        const makesOption = carMakes.map((make: string) => {
          return { value: make, label: make, checked: false };
        });
        filters[0].options = makesOption;
      } catch (error) {
        console.log(error);
      }
    };
    getMake();
    getCars();
  }, []);
  return (
    <div className="bg-white h-screen">
      <div>
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>

                    {filters.map((section, sectionIdx) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      onChange={(val) => {
                                        if (val.target.checked) {
                                          if (sectionIdx === 0) make.add(val.target.value);
                                          else if (sectionIdx === 1) type.add(val.target.value);
                                          else setAccident(1);
                                        } else {
                                          if (sectionIdx === 0) make.delete(val.target.value);
                                          else if (sectionIdx === 1) type.delete(val.target.value);
                                          else setAccident(0);
                                        }
                                      }}
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 ">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Cars</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div className="grid grid-cols-2   justify-center  ">
                  <button
                    className="flex w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={getCars}
                  >
                    Search
                  </button>
                  <Menu.Button className="group ml-5  self-center inline-flex justify-center  text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <div
                              className={classNames(
                                option.current ? "font-medium text-gray-900" : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                              onClick={() => {
                                sortOptions.forEach((op) => (op.current = false));
                                option.current = true;
                                setSort(option.name);
                                if (option.name == sortOptions[0].name) {
                                  setCars(
                                    cars.sort((a, b) => {
                                      return a.price - b.price;
                                    })
                                  );
                                }
                                if (option.name == sortOptions[1].name) {
                                  setCars(
                                    cars.sort((a, b) => {
                                      return b.price - a.price;
                                    })
                                  );
                                }
                                if (option.name == sortOptions[2].name) {
                                  setCars(
                                    cars.sort((a, b) => {
                                      return a.milage - b.milage;
                                    })
                                  );
                                }
                                if (option.name == sortOptions[3].name) {
                                  setCars(
                                    cars.sort((a, b) => {
                                      return b.milage - a.milage;
                                    })
                                  );
                                }
                              }}
                            >
                              {option.name}
                            </div>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6 ">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>

                {filters.map((section, sectionIdx) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-100 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  onChange={(val) => {
                                    if (val.target.checked) {
                                      if (sectionIdx === 0) make.add(val.target.value);
                                      else if (sectionIdx === 1) type.add(val.target.value);
                                      else setAccident(1);
                                    } else {
                                      if (sectionIdx === 0) make.delete(val.target.value);
                                      else if (sectionIdx === 1) type.delete(val.target.value);
                                      else setAccident(0);
                                    }
                                  }}
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              <div className="lg:col-span-3  justify-center 	">{<Products products={cars} />}</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
