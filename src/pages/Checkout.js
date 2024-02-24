import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoggedInUser,
  updateUserAsync,
} from "../features/auth/AuthSlice";
import Cart from "../features/cart/Cart";

function Address({ addresses, handleAddress }) {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {addresses.map((item, index) => (
        <li key={index} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <input
              id={index}
              onChange={() => handleAddress(item)}
              name="address"
              type="radio"
              checked={index == 0}
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-200"
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {item.houseNo}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {item.street}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {item.city},{item.state}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">
              Phone: {item.phone}
            </p>
            <p className="text-sm leading-6 text-gray-900">
              Pincode: {item.pincode}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function Checkout() {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  function handleAddress(add) {
    setSelectedAddress(add);
    console.log(add);
  }
  function handlePayment(method) {
    setPaymentMethod(method);
    console.log(method);
  }
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className="col-span-3 bg-white p-5 my-10">
          <form
            action="get"
            noValidate
            onSubmit={handleSubmit((data) => {
              dispatch(
                updateUserAsync({
                  ...user,
                  addresses: [...user.addresses, data],
                })
              );
              reset();
            })}
          >
            <div className="space-y-12 p-5">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  Address
                </h1>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Choose from existing address
                </p>
                <Address
                  addresses={user.addresses}
                  handleAddress={handleAddress}
                />
              </div>
              <div className="border-b border-gray-900/10 pb-12">
                {/* add address section------ */}
                <Dropdown addresses={user.addresses} register={register} />

                <div className="mt-10 space-y-10 ">
                  <fieldset>
                    <legend className="text-3xl font-bold tracking-tight text-gray-900">
                      Payment Method
                    </legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose from the following:
                    </p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="cash"
                          name="payments"
                          type="radio"
                          onChange={() => handlePayment("cash")}
                          checked={paymentMethod === "cash"}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="cash"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Cash on Delivery
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="card"
                          name="payments"
                          type="radio"
                          onChange={() => handlePayment("card")}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="card"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Debit/Credit Card
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="upi"
                          name="payments"
                          type="radio"
                          onChange={() => handlePayment("upi")}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="upi"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          UPI
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-span-2">
          <Cart page="checkout" />
        </div>
      </div>
    </div>
  );
}

function Dropdown({ addresses, register }) {
  const [hidden, setHidden] = useState(true);
  return (
    <div className="border-b border-gray-900/10 pb-12">
      <div>
        <h3
          className="text-3xl cursor-pointer font-bold flex items-center gap-3 tracking-tight text-gray-900"
          onClick={() => setHidden((state) => !state)}
        >
          Add Address
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </h3>
        {/* <p className=" px-5 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p> */}
      </div>
      {!hidden | !addresses ? (
        <div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("name", { required: "name is required" })}
                  id="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "email is required",
                  })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Country
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  {...register("phone", {
                    required: "Phone Number is required",
                  })}
                  type="tel"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("street", {
                    required: "street is required",
                  })}
                  id="street"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("city", { required: "city is required" })}
                  id="city"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="state"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                State
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("state", {
                    required: "state is required",
                  })}
                  id="state"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="pinCode"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("pinCode", {
                    required: "pincode is required",
                  })}
                  id="pincode"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Address
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
