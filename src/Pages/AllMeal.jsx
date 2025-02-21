import { useState } from "react";
import MealsCard from "../Components/SmallComponents/MealsCard";
import useMeals from "../hooks/useMeals";


const AllMeal = () => {
    const [meals] = useMeals();
    const [searchQuery,setSearchQuery] = useState('');
    const [category,setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const filterMeals = meals?.filter(meal => 
        meal.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (category ? meal.category === category : true) &&
        (minPrice ? meal.price >= +minPrice : true) &&
        (maxPrice ? meal.price <= +maxPrice : true)

    );
    return (
        <div>
            <h3 className="pt-40 pb-20 text-center text-xl">All meal</h3>

            <div className="flex gap-5 justify-center pb-10">
                <input type="text"
                placeholder="Search meal"
                value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}
                 className="p-2 border rounded-md w-80"
                />
                <select 
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                className="p-2 border rounded-md"
                >
                     <option value="">All Categories</option>
                     {
                        [...new Set(meals.map(meal=>meal.category))].map((m,idx)=>(
                            <option key={idx} value={m}>{m}</option>
                        ))
                     }
                </select>
                <input type="number" placeholder="Min $" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="p-2 border rounded-md w-20"/>
                <input type="number" placeholder="Max $" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="p-2 border rounded-md w-20"/>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pb-20">
                {/* {
                    meals.map(meal=><MealsCard key={meal._id} meal={meal}></MealsCard>)
                } */}
                {
                    filterMeals.length>0?
                    (filterMeals.map(meal=><MealsCard key={meal._id} meal={meal}></MealsCard>)):
                    <p>No meal found</p>
                }
            </div>
        </div>
    );
};

export default AllMeal;