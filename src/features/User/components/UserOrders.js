import { default as React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import {
  fetchUserOrdersAsync,
  // selectUser,
  selectUserOrders,
} from "../UserSlice";

export default function UserOrders() {
  const user = useSelector(selectLoggedInUser);
  const orders = useSelector(selectUserOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserOrdersAsync(user.id));
  }, []);

  return (
    <div>
      {orders.map((order) => {
        console.log(order);
        return <Order key={order.id} order={order} />;
      })}
    </div>
  );
}

function Order({ order }) {
  return (
    <>
      <div>
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              Order
            </h1>
            <h3 className="text-2xl my-5 font-bold tracking-tight text-gray-900">
              Order status: {order.status}
            </h3>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order.items.map((item, index) => (
                  <CartItem key={index} item={item} />
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>$ {order.totalAmount}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total Items ordered</p>
              <p>{order.totalItems} items</p>
            </div>
            <Address address={order.user.addresses[0]}></Address>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
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
              <span className="p-2">{item.quantity}</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export function Address({ address }) {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      <li className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {address.name}
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {address.houseNo}
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {address.street}
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {address.city},{address.state}
            </p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900">
            Phone: {address.phone}
          </p>
          <p className="text-sm leading-6 text-gray-900">
            Pincode: {address.pincode}
          </p>
        </div>
      </li>
    </ul>
  );
}
