import AllMeals from "../Components/HomeComponents/AllMeals";
import Banner from "../Components/HomeComponents/Banner";
import ContactPage from "../Components/HomeComponents/ContactPage";
import MealPrepareVideo from "../Components/HomeComponents/MealPrepareVideo";
import Membarship from "../Components/HomeComponents/Membarship";
import Story from "../Components/HomeComponents/Story";


const Home = () => {
    return (
        <div>
           
            <Banner></Banner>
            <Story></Story>
            <AllMeals></AllMeals>
            <Membarship></Membarship>
            <MealPrepareVideo></MealPrepareVideo>
            <ContactPage></ContactPage>
        </div>
    );
};

export default Home;