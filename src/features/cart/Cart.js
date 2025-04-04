import { useState } from "react";
import { Triangle } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { discountedPrice } from "../../app/constants";
import Modal from "../common/Modal";
import {
  createOrderAsync,
  selectAddress,
  selectOrder,
  selectPaymentMethod,
} from "../order/OrderSlice";
import { selectUserInfo } from "../User/UserSlice";
import {
  deleteItemFromCartAsync,
  selectCartStatus,
  selectItems,
  updateCartAsync,
} from "./CartSlice";

export default function Cart({ page, values = null }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const currentOrder = useSelector(selectOrder);
  const items = useSelector(selectItems);
  console.log("items", items);

  const selectedAddress = useSelector(selectAddress);
  const paymentMethod = useSelector(selectPaymentMethod);
  const status = useSelector(selectCartStatus);

  const totalAmount = items.reduce(
    (amount, item) => discountedPrice(item.product) * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  // const handleQuantity = (e, item) => {
  //   dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
  // };

  const handleOrder = () => {
    const itemsWithoutUser = items.map(({ userInfo, ...rest }) => rest);
    const order = {
      items: itemsWithoutUser,
      totalAmount,
      totalItems,
      paymentMethod,
      selectedAddress,
    };
    console.log(order);
    selectedAddress && paymentMethod && dispatch(createOrderAsync(order));
  };
  return (
    <>
      <div>
        {status === "loading" ? (
          <div className="flex flex-col justify-center items-center h-full">
            <Triangle
              visible={true}
              height="100"
              width="100"
              color="#FF6452"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
            Cart Loading...
          </div>
        ) : items && items.length ? (
          <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                Cart
              </h1>
              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
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
                {page === "checkout" ? (
                  <Link
                    to={`/order-success`}
                    // FIXME: Proper ID needs to be set
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
        ) : (
          <div className="text-center h-screen w-screen flex flex-col justify-center items-center">
            <h1 className="text-xl my-5 font-bold tracking-tight text-gray-900 text-center">
              Your cart is empty right now
            </h1>
            <Link
              to="/"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

function CartItem({ item }) {
  const [qty, setQty] = useState(1);

  const [openModal, setOpenModal] = useState(null);
  const dispatch = useDispatch();

  function incrementQty() {
    setQty((prev) => prev + 1);
    dispatch(updateCartAsync({ id: item.id, quantity: qty }));
  }
  function decrementQty() {
    qty && setQty((prev) => prev - 1);
    dispatch(updateCartAsync({ id: item.id, quantity: qty }));
  }
  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  return (
    <li key={item.id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.product.thumbnail}
          alt={item.product.title}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link to={item.product.href}>{item.product.title}</Link>
            </h3>
            <p className="ml-4">${discountedPrice(item.product)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
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
            <Modal
              title={`Delete ${item.title}`}
              message="Are you sure you want to delete this Cart item ?"
              dangerOption="Delete"
              cancelOption="Cancel"
              dangerAction={(e) => handleRemove(e, item.id)}
              cancelAction={() => setOpenModal(null)}
              showModal={openModal === item.id}
            />
            <button
              onClick={(e) => {
                setOpenModal(item.id);
              }}
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
