import {  CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { AuthContext } from "../../../Context/AuthProvider";
import Swal from "sweetalert2";


const CheckoutForm = ({price,mealPackage,packageId}) => {
    const [error,setError] = useState();
    const [clientSecret,setClientSecret] = useState('');
    const [transactionId,setTransactionId] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosPrivate = useAxiosPrivate();
    const {user} = useContext(AuthContext)
    

    useEffect(()=>{
      axiosPrivate.post('/create-payment-intent',{price})
      .then(res=>{
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret)
      })
    },[axiosPrivate,price])

    const handleSubmit = async (event) => {

        event.preventDefault();
        if (!stripe || !elements) {
            return;
          }
          const card = elements.getElement(CardElement);
          if(card==null){
              return;
          }

          const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
          })

          if(error){
            setError(error.message)
          }
          else{
            console.log('paymentMethod: ',paymentMethod)
            setError(' ')
          }

          // confirm payment
          const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret,{
            payment_method: {
              card: card,
              billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'
              }
            }
          })

          if(confirmError){
            console.log("confirmError", confirmError)
          }
          else{
            console.log("paymentIntent", paymentIntent);
            if(paymentIntent.status === "succeeded"){
              console.log("Transaction Id: ",paymentIntent.id);
              setTransactionId(paymentIntent.id);
              // save the payment in the database
              const payment = {
                email: user.email,
                price: price,
                mealPackage: mealPackage,
                packageId:packageId,
                transactionId: paymentIntent.id ,
                date: new Date() //UTC date convert. use moment js
              }
             const res= await axiosPrivate.post('/payments',payment)
             console.log("payment save ",res);

            //  assign a badge to the user
            const badge = {
              badge: mealPackage
            }
            const result = await axiosPrivate.patch(`/users/${user.email}`,badge);
            console.log("Badge: ",result)


              Swal.fire({
                title: "Good job!",
                text: "Payment successful!",
                icon: "success"
              });
            }
          }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
               
                <CardElement></CardElement>
                <button 
                className="btn mt-5 bg-orange-400 text-white rounded-2xl"
                disabled={!stripe || !clientSecret}
                >Pay</button>
                {error && <p className="text-red-500">{error}</p>}
                {transactionId && <p className="text-green-500">Your transaction id is: {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;