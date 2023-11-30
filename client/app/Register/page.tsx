"use client";
import { registerUser } from "@/fetchHelper/auth";
import { addCar } from "@/fetchHelper/cart";
import { initialize } from "@/store/cartSlice";
import store, { RootState } from "@/store/store";
import { logIn } from "@/store/userSlice";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Register() {
  const user = useSelector((state: RootState) => state.user);
  const guestCart = useSelector((state: RootState) => state.cart);
  const checkout = Boolean(useSearchParams().get("checkout"));

  if (user.token && !checkout) window.location.href = "/";

  const register = async (event: any) => {
    if (!password) return;
    event.preventDefault();
    const registeredUser: Partial<User> = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      address: address,
      role: "user",
    };

    const newUser = await registerUser(registeredUser);
    if (!newUser) {
      alert("There is an error creating the user");
      return;
    }
    if (newUser.token && newUser.id) {
      if (guestCart.length) {
        store.dispatch(initialize(guestCart));
        for (let i = 0; i < guestCart.length; i++) {
          await addCar(newUser?.id, guestCart[i].id, guestCart[i].quantity, newUser.token);
        }
      }
      store.dispatch(logIn(newUser));
      if (checkout && guestCart.length) window.location.href = "/order";
    }
  };
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  return (
    !user.token && (
      <div className=" h-screen  bg-white  min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Toaster position="top-center" reverseOrder={false} />

        <div className="  sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register an account
          </h2>
        </div>

        <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          <form className=" space-y-6" onSubmit={register}>
            <div className="grid grid-cols-2 gap-x-6">
              <div className="">
                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    onChange={(val) => {
                      setFirstName(val.target.value);
                    }}
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    onChange={(val) => {
                      setLastName(val.target.value);
                    }}
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                Address
              </label>
              <div className="mt-2">
                <input
                  onChange={(val) => {
                    setAddress(val.target.value);
                  }}
                  id="address"
                  name="address"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={(val) => {
                    setEmail(val.target.value);
                  }}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={(val) => {
                    setPassword(val.target.value);
                  }}
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500"></p>
        </div>
      </div>
    )
  );
}
