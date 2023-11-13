"use client";

import store, { RootState } from "@/store/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "@/store/userSlice";
import { useRouter } from "next/navigation";

export default function Example() {
  const user = useSelector((state: RootState) => state.user);
  const Router = useRouter();
  if (user.token) {
    Router.replace("/");
  }
  const login = async () => {
    try {
      if (password && email) {
        const res = await fetch("/api/user", {
          method: "POST",
          body: JSON.stringify({ email: email, password: password }),
          headers: {
            "Content-Type": "application/json",
            rejectUnauthorized: "false",
            endPoint: "SignIn",
            cache: "no-store",
          },
        });

        if (res.status === 404) {
          alert("Wrong Email or Password");
          return;
        }
        const user = (await res.json()) as User;
        if (user.token) {
          store.dispatch(logIn(user));
          window.location.href = "/";
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  return (
    <div className=" h-screen  bg-white  min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="  sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
        <div className=" space-y-6">
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
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => login()}
            >
              Sign in
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500"></p>
      </div>
    </div>
  );
}
