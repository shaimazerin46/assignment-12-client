import { useParams } from "react-router-dom";
import usePackage from "../hooks/usePackage";
import PackageCard from "../Components/SmallComponents/PackageCard";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Components/SmallComponents/Payment/CheckoutForm ";
import { MdOutlineCancelPresentation } from "react-icons/md";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);


const PackageDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {name} = useParams();
    const [packages] = usePackage();
    const filterPackage = packages?.filter(subPackage=>subPackage.name===name);
    const data = filterPackage[0];
    const price = data?.price;
    const mealPackage = data?.name;
    const packageId = data?._id;

    const handlePurchases = ()=>{

        setIsModalOpen(true);

    }
    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div >
           
            <div className="md:pt-60 md:pb-20 py-10  mx-auto w-[400px]">
                <PackageCard Menupackage={data}></PackageCard>
                <button onClick={handlePurchases} className="btn mt-5 mx-auto flex justify-center prime_bg rounded-2xl text-white">Purchases </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-2xl w-[500px] space-y-5">
                    {/* stripe */}
                    <Elements stripe={stripePromise}>
                        <CheckoutForm price={price} packageId={packageId} mealPackage={mealPackage}></CheckoutForm>
                    </Elements>


                        <div className="mt-4 flex justify-end">
                            <button 
                                onClick={closeModal} 
                                className="text-red-500 text-xl"
                            >
                               <MdOutlineCancelPresentation />
                            </button>
                           
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PackageDetails;