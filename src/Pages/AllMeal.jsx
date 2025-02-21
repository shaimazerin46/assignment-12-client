import { useState } from "react";
import MealsCard from "../Components/SmallComponents/MealsCard";
import InfiniteScroll from "react-infinite-scroller";
import useAxiosPublic from "../hooks/useAxiosPublic";


const AllMeal = () => {
    const axiosPublic = useAxiosPublic()
    const [meals, setMeals] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery,setSearchQuery] = useState('');
    const [category,setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const loadMoreMeals = async () => {
        const { data } = await axiosPublic.get(`/meals`, {
            params: { search: searchQuery, category, minPrice, maxPrice, page, limit: 6 }
        });
    
        setMeals(prevMeals => [...prevMeals, ...data]);
        setPage(prevPage => prevPage + 1);
        setHasMore(data.length > 0);
    };
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

            <InfiniteScroll pageStart={1} loadMore={loadMoreMeals} hasMore={hasMore} loader={<p className="text-center">Loading...</p>}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pb-20">
                    {meals.length > 0 ? meals.map(meal => <MealsCard key={meal._id} meal={meal} />) : <p>No meals found</p>}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default AllMeal;