import AllMeals from "../Components/HomeComponents/AllMeals";
import Banner from "../Components/HomeComponents/Banner";
import MealPrepareVideo from "../Components/HomeComponents/MealPrepareVideo";
import Membarship from "../Components/HomeComponents/Membarship";


const Home = () => {
    return (
        <div>
           
            <Banner></Banner>
            <AllMeals></AllMeals>
            <Membarship></Membarship>
            <MealPrepareVideo></MealPrepareVideo>
        </div>
    );
};

export default Home;