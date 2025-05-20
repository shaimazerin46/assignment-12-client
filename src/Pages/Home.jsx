import AllMeals from "../Components/HomeComponents/AllMeals";
import Banner from "../Components/HomeComponents/Banner";
import ContactPage from "../Components/HomeComponents/ContactPage";
import FAQs from "../Components/HomeComponents/FAQs";
import MealPrepareVideo from "../Components/HomeComponents/MealPrepareVideo";
import Membarship from "../Components/HomeComponents/Membarship";
import Story from "../Components/HomeComponents/Story";
import Testimonial from "../Components/HomeComponents/Testimonial";


const Home = () => {
    return (
        <div>
           
            <Banner></Banner>
            <Story></Story>
            <AllMeals></AllMeals>
            <Membarship></Membarship>
            <Testimonial></Testimonial>
            <FAQs></FAQs>
            <MealPrepareVideo></MealPrepareVideo>
            <ContactPage></ContactPage>
        </div>
    );
};

export default Home;