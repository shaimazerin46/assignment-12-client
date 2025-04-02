import {useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import UpcomingMealCard from "../Components/SmallComponents/UpcomingMealCard";
import Heading from "../Components/SmallComponents/Heading";



const UpcomingMeals = () => {
    const [upcomingMeals, setUpcomingMeals] = useState();
    const axiosPublic = useAxiosPublic();
   

    useEffect(() => {
        axiosPublic.get('/upcomingMeals')
            .then(res => {
                setUpcomingMeals(res.data)
            })
    }, [])

    
    return (
        <div className="p-3 md:p-0">
            <div className="mt-30">
                <Heading text={'Upcoming meals'}></Heading>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pb-20 max-w-7xl mx-auto">
                {upcomingMeals?.map((upcomingMeal) => <UpcomingMealCard key={upcomingMeal._id} upcomingMeal={upcomingMeal}></UpcomingMealCard>)}
            </div>
        </div>
    );
};

export default UpcomingMeals;
