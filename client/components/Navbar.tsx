"use client";
import store from "../store/store";
import { initialize } from "@/store/cartSlice";
import Link from "next/link";
import Cart from "./Cart";

export default function Navbar() {
  try {
    return (
      <nav aria-label="Top" className="bg-white mx-auto  px-4 sm:px-6 lg:px-8 ">
        <div className="bg-white ">
          <div className="bg-white flex h-16 items-center">
            {/* Logo */}
            <div className="flex 	 ">
              <Link href="/">
                <span className="sr-only">Your Company</span>
                <img className="h-16 " src="/logo.png" alt="" />
              </Link>
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 ml-6">
                <Link href="/cars" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                  Shop
                </Link>
                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                <Link href="/cars/hotdeals" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                  Deals
                </Link>
                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />

                <Link href="/calculator" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                  Loan Calculator
                </Link>
              </div>
            </div>
            <Cart />
          </div>
        </div>
      </nav>
    );
  } catch {
    store.dispatch(initialize([]));
  }
}
