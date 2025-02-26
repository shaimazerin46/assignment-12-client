import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";


const ServedMeal = () => {
    const [servedMeals, setServedMeal] = useState();
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
        axiosPublic.get('/requestedMeal')
            .then(res => {
                setServedMeal(res.data)
            })
    }, [])
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
            <h3 className="text-center text-xl py-10">Serve meal</h3>

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
                            {
                                servedMeals?.map((servedMeal, idx) => <tr key={servedMeal._id} className="bg-base-200">
                                    <th>{idx + 1}</th>
                                    <td>{servedMeal?.title}</td>
                                    <td>{servedMeal?.email}</td>
                                    <td>{servedMeal.distributor}</td>
                                    <td>{servedMeal.status}</td>
                                    <td>
                                        <button
                                            onClick={() => handleServeMeal(servedMeal._id)}
                                            disabled={servedMeal.status === "Delivered"}
                                            className={`btn ${servedMeal.status === "Delivered" ? "btn-disabled" : "btn-accent text-white"}`}
                                        >
                                            {servedMeal.status === "Delivered" ? "Served" : "Serve"}
                                        </button>
                                    </td>

                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default ServedMeal;