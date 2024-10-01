import { useEffect } from "react";

// DOUBT: Should I necessarily make reusable components even if the code is too complex
export default function Address({ addresses, handleAddress }) {
  useEffect(() => {
    if (handleAddress && addresses && addresses.length > 0) {
      handleAddress(addresses[0]);
    }
  }, [addresses, handleAddress]);

  return (
    <ul className="border-2 rounded-md px-2">
      {addresses &&
        addresses.map((item, index) => (
          <li key={index} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              {/* TODO: Default Address should be checked by default */}
              {handleAddress && (
                <input
                  id={index}
                  onChange={() => handleAddress(item)}
                  name="address"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-200"
                  defaultChecked={index === 0}
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
                Pincode: {item.pinCode}
              </p>
            </div>
          </li>
        ))}
    </ul>
  );
}
