import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { resetCartAsync } from "../cart/CartSlice";
import { resetCurrentOrder, selectOrder } from "./OrderSlice";

export function Order() {
  const currentOrder = useSelector(selectOrder);
  console.log("current order:", currentOrder);

  // const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetCartAsync());
    dispatch(resetCurrentOrder);
  }, [dispatch]);
  return (
    <div>
      {!currentOrder && <Navigate to="/" replace={true} />}
      {currentOrder && currentOrder.message ? (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600"></p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Order Already Placed
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              You have previously placed this exact order. In order to prevent
              duplicate orders, we have halted this request.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/orders/"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Your Orders
              </Link>
              <Link
                to="/contact"
                className="text-sm font-semibold text-gray-900"
              >
                Contact Support <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link to="/" className="text-sm font-semibold text-gray-900">
                Go Back to Home <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </main>
      ) : (
        currentOrder && (
          <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
              <p className="text-base font-semibold text-indigo-600">
                Your order has been placed successfully
              </p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Order id: #{currentOrder.id}
              </h1>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Checkout more of our products:
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Go back home
                </Link>
                <Link
                  to="/contact"
                  className="text-sm font-semibold text-gray-900"
                >
                  Contact support <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </main>
        )
      )}
    </div>
  );
}
