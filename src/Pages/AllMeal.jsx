import { useEffect, useState } from "react";
import MealsCard from "../Components/SmallComponents/MealsCard";
import useAxiosPublic from "../hooks/useAxiosPublic";
import InfiniteScroll from "react-infinite-scroller";

const AllMeal = () => {
    const axiosPublic = useAxiosPublic();
    const [meals, setMeals] = useState([]);
    const [categories, setCategories] = useState([]); 
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true); 

    useEffect(() => {
        axiosPublic.get("meals")
            .then(res => {
                setMeals(res.data);
                const uniqueCategories = [...new Set(res.data.map(meal => meal.category).filter(Boolean))]; //more details
                setCategories(uniqueCategories);
            })
            
    }, []);

   

    useEffect(() => {
     
        setPage(1); //Resets the pagination to the first page whenever filters change.
        axiosPublic.get("meals", {
            params: { search: searchQuery, category, minPrice, maxPrice }
        })
        .then(res => {
            setMeals(res.data)
            setHasMore(res.data.length > 0); // If the response contains meals, hasMore is set to true, allowing infinite scrolling.
        })
        
    }, [searchQuery, category, minPrice, maxPrice]);

    const fetchMoreMeals = () => {
        axiosPublic.get("meals", {
            params: { search: searchQuery, category, minPrice, maxPrice, page: page + 1 }
        })
        .then(res => {
            setMeals(prevMeals => [...prevMeals, ...res.data]); //appends the new meals to the existing list.
            setPage(prevPage => prevPage + 1);
            setHasMore(res.data.length > 0); 
        })
        .catch(err => console.error("Error loading more meals:", err));
    }; //This function is responsible for loading more meals when the user scrolls down

    return (
        <div>
            <h3 className="pt-40 pb-20 text-center text-xl">All Meals</h3>
            <div className="flex flex-col md:flex-row gap-5 justify-center pb-10">
                <input
                    type="text"
                    placeholder="Search meal"
                    value={searchQuery} //when searchQuery changes, the input reflects the updated value.
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded-md w-80"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 border rounded-md"
                >
                    <option value="">All Categories</option>
                    {categories.length > 0 ? categories.map((c, idx) => (
                        <option key={idx} value={c}>{c}</option>
                    )) : <option disabled>No categories found</option>}
                </select>

                <input
                    type="number"
                    placeholder="Min BDT"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="p-2 border rounded-md w-20"
                />
                <input
                    type="number"
                    placeholder="Max BDT"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="p-2 border rounded-md w-20"
                />
            </div>
            <InfiniteScroll
                pageStart={0}
                loadMore={fetchMoreMeals}
                hasMore={hasMore}
                loader={<h4 className="text-center">Loading...</h4>}
            >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pb-20">
                    {meals.length > 0 ? meals.map(meal => (
                        <MealsCard key={meal._id} meal={meal} />
                    )) : <p className="text-center">No meals found</p>}
                </div>
            </InfiniteScroll>

          

           
        </div>
    );
};

export default AllMeal;
