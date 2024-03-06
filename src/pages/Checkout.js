import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../features/User/UserSlice";
import { updateUserAsync } from "../features/auth/AuthSlice";
import Cart from "../features/cart/Cart";
import {
  selectPaymentMethod,
  setPaymentMethod,
  setSelectedAddress,
} from "../features/order/OrderSlice";
import PaymentOptions from "../features/checkout/PaymentOptions";
import AddressDropdown from "../features/checkout/AddressDropdown";
import Address from "../features/checkout/Address";

export default function Checkout() {
  // const [selectedAddress, setSelectedAddress] = useState(null);
  // const [paymentMethod, setPaymentMethod] = useState("cash");
  const user = useSelector(selectUserInfo);
  const paymentMethod = useSelector(selectPaymentMethod);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function handleAddress(add) {
    dispatch(setSelectedAddress(add));
    console.log(add);
  }
  function handlePayment(method) {
    dispatch(setPaymentMethod(method));
    console.log(paymentMethod);
  }
  // FIXME:Order should not be placed if cart is empty or address is empty
  // TODO:Edit Address Option functionality
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className="col-span-3 bg-white p-5 my-10">
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
              <form
                action="get"
                noValidate
                onSubmit={handleSubmit((data) => {
                  data.name !== "" &&
                    dispatch(
                      updateUserAsync({
                        ...user,
                        addresses: [...user.addresses, data],
                      })
                    );
                  reset();
                })}
              >
                <AddressDropdown
                  addresses={user.addresses}
                  register={register}
                />

                <div className="mt-10 space-y-10 ">
                  <fieldset>
                    <legend className="text-3xl font-bold tracking-tight text-gray-900">
                      Payment Method
                    </legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose from the following:
                    </p>
                    <PaymentOptions
                      paymentMethod={paymentMethod}
                      handlePayment={handlePayment}
                    />
                  </fieldset>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <Cart page="checkout" />
        </div>
      </div>
    </div>
  );
}
