import { default as React, useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { discountedPrice } from "../../../app/constants";
import Address from "../../checkout/Address";
import {
  fetchUserOrdersAsync,
  selectUserOrders,
  selectUserStatus,
} from "../UserSlice";

export default function UserOrders() {
  const orders = useSelector(selectUserOrders);
  const dispatch = useDispatch();
  const orderStatus = useSelector(selectUserStatus);
  const navigate = useNavigate();
  const [toastShown, setToastShown] = useState(false);

  useEffect(() => {
    dispatch(fetchUserOrdersAsync());
  }, [dispatch]);

  useEffect(() => {
    if (orderStatus === "rejected" && !orders.length && !toastShown) {
      toast.error("Order could not be fetched. Please try again later.");
      setToastShown(true);
    }
  }, [orderStatus, orders, navigate, toastShown]);

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {orderStatus === "idle" && orders.length ? (
        typeof orders === Object && orderStatus === "rejected" ? (
          <div className="text-center h-screen w-screen flex flex-col justify-center items-center">
            <h1 className="text-xl my-5 font-bold tracking-tight text-gray-900 text-center">
              We could not find any orders from this account!
            </h1>
            <Link
              to="/"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div>
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900 text-center">
              Order
            </h1>
            {orders.map((order) => {
              return <Order key={order.id} order={order} />;
            })}
          </div>
        )
      ) : (
        <div className="flex justify-center items-center h-screen w-screen">
          <Triangle
            visible={true}
            height="100"
            width="100"
            color="#FF6452"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          Orders Loading...
        </div>
      )}
    </div>
  );
}

function Order({ order }) {
  return (
    <>
      <div>
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl my-5 font-bold tracking-tight text-gray-900">
                Order status: {order.status}
              </h3>
              <span className="italic">id: #{order.id}</span>
            </div>
            <div className="flow-root">
              <ul className="-my-6 divide-y divide-gray-200">
                {order.items.map((item, index) => (
                  <CartItem
                    key={index}
                    item={item.product}
                    quantity={item.quantity}
                  />
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
            <Address addresses={[order.selectedAddress]} />
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

function CartItem({ item, quantity }) {
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
              <Link to={item.href}>{item.title}</Link>
            </h3>
            <p className="ml-4">${discountedPrice(item)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="text-gray-500 flex">
            <label
              htmlFor="quantity"
              className="inline mr-1 text-sm font-medium leading-6 text-gray-900"
            >
              Qty:
            </label>
            <div>
              <span>{quantity}</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
