import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../User/UserSlice";
import { updateUserAsync } from "../auth/AuthSlice";

export default function Address({
  addresses,
  handleAddress,
  // DOUBT: Should I necessarily make reusable components even if the code is too complex
  // page,
  // addressIndex,
  // setValue,
  // setSelectedEditIndex,
}) {
  // const dispatch = useDispatch();
  // const user = useSelector(selectUserInfo);
  // const handleEditForm = (index) => {
  //   setSelectedEditIndex(index);
  //   const address = user.addresses[index];
  //   setValue("name", address.name);
  //   setValue("email", address.email);
  //   setValue("city", address.city);
  //   setValue("state", address.state);
  //   setValue("pinCode", address.pinCode);
  //   setValue("phone", address.phone);
  //   setValue("street", address.street);
  // };

  // const handleRemove = (e, index) => {
  //   const newUser = { ...user, addresses: [...user.addresses] }; // for shallow copy issue
  //   newUser.addresses.splice(index, 1);
  //   dispatch(updateUserAsync(newUser));
  // };
  return (
    <ul role="list" className="border-2 rounded-md px-2">
      {addresses.map((item, index) => (
        <li key={index} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            {/* TODO: Default Address should be selectdby default */}
            {handleAddress && (
              <input
                id={index}
                onChange={() => handleAddress(item)}
                name="address"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-200"
              />
            )}
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
          {/* {page && page == "profile" && (
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <button
                onClick={(e) => handleEditForm(index)}
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Edit
              </button>
              <button
                onClick={(e) => handleRemove(e, index)}
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Remove
              </button>
            </div>
          )} */}
        </li>
      ))}
    </ul>
  );
}
