import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";
import Heading from "../../Components/SmallComponents/Heading";


const Allmeal = () => {
    const [meals, setMeals] = useState([]); // State to store meals
    const [sortBy, setSortBy] = useState(""); // Sorting field
    const [order, setOrder] = useState("asc"); // Sorting order
    const axiosPrivate = useAxiosPrivate();

    
    const fetchMeals = async () => {
        try {
            const response = await axiosPrivate.get(`/meals?sortBy=${sortBy}&order=${order}`);
            setMeals(response.data);
        } catch (err) {
            console.error("Error fetching meals:", err);
        }
    };

   
    useEffect(() => {
        fetchMeals();
    }, [sortBy, order]);

    // Handle sorting change
    const handleSortChange = (newSortBy) => {
        let newOrder = "asc";
        if (sortBy === newSortBy) {
            newOrder = order === "asc" ? "desc" : "asc"; 
        }
        setSortBy(newSortBy);
        setOrder(newOrder);
    };

    // Handle meal deletion
    const handleDelete = async (id) => {
        try {
            const response = await axiosPrivate.delete(`/meals/${id}`);
            if (response.data.deletedCount > 0) {
                Swal.fire({ icon: "success", title: "Successfully deleted" });
                fetchMeals(); 
            }
        } catch (err) {
            console.error("Error deleting meal:", err);
        }
    };

    return (
        <div className="min-h-screen">
            <Heading text={"All meals"}></Heading>

            {/* Sorting Controls */}
            <div className="flex justify-center mb-4 gap-4">
                <button
                    onClick={() => handleSortChange("like")}
                    className="btn btn-outline"
                >
                    Sort by Likes {sortBy === "like" ? (order === "asc" ? "↑" : "↓") : ""}
                </button>
                <button
                    onClick={() => handleSortChange("reviewCount")}
                    className="btn btn-outline"
                >
                    Sort by Reviews {sortBy === "reviewCount" ? (order === "asc" ? "↑" : "↓") : ""}
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="text-black">
                            <th></th>
                            <th>Title</th>
                            <th>Distributor Name</th>
                            <th>Rating</th>
                            <th>Likes</th>
                            <th>Reviews Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meals.map((meal, idx) => (
                            <tr key={meal._id}>
                                <th>{idx + 1}</th>
                                <td>{meal.title}</td>
                                <td>{meal.distributor}</td>
                                <td>{meal.rating}</td>
                                <td>{meal.like}</td>
                                <td>{meal.reviewCount}</td>
                                <td className="flex ">
                                    <Link to={`/dashboard/updateMeal/${meal._id}`}>
                                        <button className="btn mr-3 mb-2 button-bg text-white btn-sm">
                                            Update
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(meal._id)}
                                        className="btn btn-sm bg-red-500 text-white"
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td className="text-blue-500 underline">
                                    <Link to={`/meals/${meal._id}`}>View Meal</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Allmeal;
