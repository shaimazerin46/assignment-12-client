import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import Heading from "../../Components/SmallComponents/Heading";


const ServedMeal = () => {
    const [servedMeals, setServedMeal] = useState();
    const axiosPublic = useAxiosPublic();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchMeals();
    }, [searchTerm]); 

    const fetchMeals = () => {
        axiosPublic.get(`/requestedMeal?search=${searchTerm}`)
            .then(res => {
                setServedMeal(res.data);
            })
            .catch(err => console.error("Error fetching meals:", err));
    };

    const handleServeMeal = (id)=>{
        axiosPublic.patch(`/requestedMeal/${id}`, { status: "Delivered" })
        .then(res => {
            if (res.data.modifiedCount > 0) {
                setServedMeal(prevMeals =>
                    prevMeals.map(meal =>
                        meal._id === id ? { ...meal, status: "Delivered" } : meal
                    )
                );
                Swal.fire({
                    title: "Good job!",
                    text: "You have changed status",
                    icon: "success"
                  });
            }
        })
    }
    return (
        <div>
           <Heading text={"Served meals"}></Heading>

            <div className="flex justify-center mb-5">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-1/2"
                />
            </div>

            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {servedMeals?.length > 0 ? (
                            servedMeals.map((servedMeal, idx) => (
                                <tr key={servedMeal._id} className="bg-base-200">
                                    <th>{idx + 1}</th>
                                    <td>{servedMeal?.title}</td>
                                    <td>{servedMeal?.email}</td>
                                    <td>{servedMeal.distributor}</td>
                                    <td>{servedMeal.status}</td>
                                    <td>
                                        <button
                                            onClick={() => handleServeMeal(servedMeal._id)}
                                            disabled={servedMeal.status === "Delivered"}
                                            className={`btn ${servedMeal.status === "Delivered" ? "btn-disabled" : "button-bg text-white"}`}
                                        >
                                            {servedMeal.status === "Delivered" ? "Served" : "Serve"}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center text-gray-500">No meals found</td>
                            </tr>
                        )}
                    </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default ServedMeal;