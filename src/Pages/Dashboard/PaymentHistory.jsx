import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [payments, setPayments] = useState();

  useEffect(() => {
    axiosPublic.get("/payments").then((res) => {
      setPayments(res.data);
    });
  }, []);

  const filteredPayment = payments?.find((payment) => payment.email === user.email);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center transform transition-all duration-500 hover:scale-105">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">Payment History</h3>

        {filteredPayment ? (
          <div className="space-y-4 text-gray-600 text-lg">
            <div className="bg-gradient-to-r from-[#DDEB9D] to-[#A0C878] text-white rounded-lg p-4 shadow-md">
              <p className="text-xl font-semibold">Meal Package:</p>
              <p className="text-2xl font-bold">{filteredPayment?.mealPackage}</p>
            </div>

            <div className="bg-gradient-to-r from-[#DDEB9D] to-[#A0C878] text-white rounded-lg p-4 shadow-md">
              <p className="text-xl font-semibold">Total Cost:</p>
              <p className="text-2xl font-bold ">${filteredPayment?.price}</p>
            </div>

            <div className="bg-gradient-to-r from-[#DDEB9D] to-[#A0C878] text-white rounded-lg p-4 shadow-md">
              <p className="text-xl font-semibold">Transaction ID:</p>
              <p className="text-lg font-bold ">{filteredPayment?.transactionId}</p>
            </div>

            <div className="mt-6">
              <button className="bg-[#e7a11f] text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300">
                View More Details
              </button>
            </div>
          </div>
        ) : (
          <p className="text-lg font-semibold text-gray-500">No payment found 😢</p>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
