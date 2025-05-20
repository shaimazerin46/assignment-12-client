import Heading from "../SmallComponents/Heading";
import FAQcard from "./FAQcard";


const FAQs = () => {
    return (
        <div className="max-w-7xl mx-auto md:mb-20 mb-5">
            <Heading text={"FAQ section"}></Heading>

            <FAQcard question={"What is the check-in/check-out time?"} answer={" Check-in time is from 10 AM, and check-out must be completed by 10 AM on the day of departure."}></FAQcard>

            <FAQcard question={"Are meals included in the hostel fees?"} answer={" Yes, all meals (breakfast, lunch, evening snacks, and dinner) are included in the monthly hostel fees."}></FAQcard>

            <FAQcard question={"Can parents or visitors stay overnight?"} answer={" Visitors are allowed only during visiting hours. Overnight stays are not permitted for guests"
            }></FAQcard>

            <FAQcard question={"Is there Wi-Fi available?"} answer={" Yes, high-speed Wi-Fi is available 24/7 in all hostel rooms and common areas."
            }></FAQcard>



        </div>
    );
};

export default FAQs;