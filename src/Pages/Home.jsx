import AllMeals from "../Components/HomeComponents/AllMeals";
import Banner from "../Components/HomeComponents/Banner";
import Membarship from "../Components/HomeComponents/Membarship";


const Home = () => {
    return (
        <div>
           
            <Banner></Banner>
            <AllMeals></AllMeals>
            <Membarship></Membarship>
        </div>
    );
};

export default Home;