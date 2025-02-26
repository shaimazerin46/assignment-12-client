import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";

const UpcomingMealsAdmin = () => {
  const [upcomingMeals, setUpcomungMeals] = useState();
  const [publishedMeals, setPublishedMeals] = useState([]);

  const axiosPublic = useAxiosPublic();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPublic.get('/upcomingMeals')
      .then(res => {
        setUpcomungMeals(res.data)
      })
  }, []);

  const handlePublish = (id) => {
    const filteredMeal = upcomingMeals?.find(upcomingMeal => upcomingMeal._id === id)
    const mealItem = {
      category: filteredMeal?.category,
      description: filteredMeal?.description,
      distributor: filteredMeal?.distributor,
      image: filteredMeal?.image,
      ingredients: filteredMeal?.ingredients,
      like: filteredMeal?.like,
      post_time: filteredMeal?.post_time,
      price: filteredMeal?.price,
      rating: filteredMeal?.rating,
      title: filteredMeal?.title

    }
    axiosPrivate.post('/meals', mealItem)
      .then(res => {
        console.log(res.data)
        if (res.data.insertedId) {
          Swal.fire({
            title: "Good job!",
            text: "Meal published!",
            icon: "success"
          });
          setPublishedMeals(prevState => [...prevState, id]);
        }
      })
  }
  return (
    <div>
      <h3 className="text-center text-xl py-10">Upcoming meal</h3>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Like</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              upcomingMeals?.map((upcomingMeal, idx) => <tr key={upcomingMeal._id} className="bg-base-200">
                <th>{idx + 1}</th>
                <td>{upcomingMeal?.title}</td>
                <td>{upcomingMeal?.price}</td>
                <td>{upcomingMeal?.category}</td>
                <td>{upcomingMeal?.like}</td>
                <td>
                  <button
                    onClick={() => handlePublish(upcomingMeal._id)}
                    className="btn btn-accent text-white"
                    disabled={publishedMeals.includes(upcomingMeal._id)}
                  >
                    {publishedMeals.includes(upcomingMeal._id) ? "Published" : "Publish"}
                  </button>
                </td>
              </tr>)
            }


          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingMealsAdmin;