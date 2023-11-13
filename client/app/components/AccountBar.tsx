"use client";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from "@heroicons/react/20/solid";
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "@/store/store";
import { logOut } from "@/store/userSlice";
import { useRouter } from "next/navigation";
import { emptyCart } from "@/store/cartSlice";

const solutions = [
  { name: "Account", description: "", href: "#", icon: FingerPrintIcon },
  { name: "Orders", description: "", href: "#", icon: CursorArrowRaysIcon },
  {
    name: "Shopping Cart",
    description: "",
    href: "#",
    icon: ChartPieIcon,
  },
  { name: "Integrations", description: "", href: "#", icon: SquaresPlusIcon },
  { name: "Automations", description: "", href: "#", icon: ArrowPathIcon },
];
const callsToAction = [{ name: "Sign Out", href: "#", icon: PlayCircleIcon }];

export default function Example() {
  const user = useSelector((state: RootState) => state.user);
  const Router = useRouter();

  const logout = () => {
    store.dispatch(emptyCart());
    store.dispatch(logOut());
  };
  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        <span>{user.firstName}</span>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {solutions.map((item) => (
                <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                  <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                  </div>
                  <div>
                    <a href={item.href} className="font-semibold text-gray-900">
                      {item.name}
                      <span className="absolute inset-0" />
                    </a>
                    <p className="mt-1 text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 divide-x  divide-gray-900/5 bg-gray-50">
              {callsToAction.map((item) => (
                <button
                  key={item.name}
                  onClick={logout}
                  className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                >
                  <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
