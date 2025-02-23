import {useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

import UpcomingMealCard from "../Components/SmallComponents/UpcomingMealCard";



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
        <div>
            <h3 className="pt-40 text-xl text-center pb-20">Upcoming meals</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pb-20">
                {upcomingMeals?.map((upcomingMeal) => <UpcomingMealCard key={upcomingMeal._id} upcomingMeal={upcomingMeal}></UpcomingMealCard>)}
            </div>
        </div>
    );
};

export default UpcomingMeals;
