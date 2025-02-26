import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const PaymentHistory = () => {
    const {user} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [payments,setpayments] = useState()

    useEffect(()=>{
        axiosPublic.get('/payments')
        .then(res=>{
            setpayments(res.data)
        })
    },[])

    const filteredPayment = payments?.find(payments=>payments.email===user.email);
    // console.log(filteredPayment)
    return (
        <div>
            <h3 className="text-center text-xl py-10">Payment history</h3>

            {filteredPayment? <div className="w-[500px] shadow-xl p-10 spacey-3 text-gray-600 text-sm mx-auto">
                <p>Meal package: {filteredPayment?.mealPackage}</p>
                <p>Total cost: {filteredPayment?.price}</p>
                <p>Transaction Id: {filteredPayment?.transactionId}</p>
            </div> : <p>No payment</p>
            }
        </div>
    );
};

export default PaymentHistory;