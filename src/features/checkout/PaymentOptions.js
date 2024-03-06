export default function PaymentOptions({ paymentMethod, handlePayment }) {
  return (
    <div className="mt-6 space-y-6">
      <div className="flex items-center gap-x-3">
        <input
          id="cash"
          name="payments"
          type="radio"
          onChange={() => {
            return handlePayment("cash");
          }}
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
          checked={paymentMethod === "card"}
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
          checked={paymentMethod === "upi"}
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
  );
}
