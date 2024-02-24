import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectLoggedInUser } from "../auth/AuthSlice";
import {
  deleteItemFromCartAsync,
  fetchItemsByUserIdAsync,
  selectItems,
  updateCartAsync,
} from "./CartSlice";
import { createOrderAsync } from "../order/OrderSlice";

export default function Cart({ page }) {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    dispatch(fetchItemsByUserIdAsync(user.id));
  }, []);
  const [open, setOpen] = useState(true);

  const items = useSelector(selectItems);
  const totalAmount = items.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleOrder = () => {
    const order = {
      items,
      totalAmount,
      totalItems,
      user,
      // paymentMethod,
      // selectedAddress,
    };
    dispatch(createOrderAsync(order));
  };
  return (
    <>
      <div>
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              Cart
            </h1>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items.map((item, index) => (
                  <CartItem key={index} item={item} />
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>$ {totalAmount}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total Items in Cart</p>
              <p>{totalItems} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              {page == "checkout" ? (
                <Link
                  onClick={() => handleOrder()}
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Order Now
                </Link>
              ) : (
                <Link
                  to="/checkout"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </Link>
              )}
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CartItem({ item }) {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  function incrementQty() {
    setQty((prev) => prev + 1);
  }
  function decrementQty() {
    qty && setQty((prev) => prev - 1);
  }
  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };
  useEffect(() => {
    dispatch(updateCartAsync({ ...item, quantity: qty }));
  }, [qty]);

  return (
    <li key={item.id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href={item.href}>{item.title}</a>
            </h3>
            <p className="ml-4">${item.price}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="text-gray-500 flex">
            <label
              htmlFor="quantity"
              className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
            >
              Qty
            </label>
            <div>
              <button
                onClick={decrementQty}
                className="text-gray-900 bg-gray-300 px-2 py-1 rounded-sm"
              >
                -
              </button>
              <span className="p-2">{qty}</span>
              <button
                onClick={incrementQty}
                className="text-gray-900 bg-gray-300 px-2 py-1 rounded-sm"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex">
            <button
              onClick={(e) => handleRemove(e, item.id)}
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
