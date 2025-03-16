import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import useUser from "../../hooks/useUser";
import useRequestedMeal from "../../hooks/useRequestedMeal";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [users] = useUser();
  const [requestedMeals] = useRequestedMeal();
  const axiosPublic = useAxiosPublic();
  const [reviews, setReviews] = useState([]);

  // Fetch reviews
  useEffect(() => {
    axiosPublic.get("/reviews").then((res) => {
      setReviews(res.data);
    });
  }, []);

  // Extract user details
  const filteredUser = users?.find((u) => u.email === user.email);
  const userReviews = reviews?.filter((u) => u.email === user.email);

  const { name, photo, email, badge } = filteredUser || {};
  const likes = userReviews?.reduce((total, review) => total + (review.likes || 0), 0);
  const reviewsCount = userReviews?.length || 0;

  const requestedMeal = requestedMeals.filter((meal) => meal.email === user.email);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="relative bg-gradient-to-br from-orange-200 to-orange-400 shadow-2xl rounded-2xl p-8 w-full max-w-md text-center transform transition-all duration-500 hover:scale-105">
        {/* Floating User Photo */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <img
            src={photo || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="w-32 h-32 object-cover rounded-full border-4 border-orange-400 shadow-lg"
          />
        </div>

        {/* Name & Email */}
        <h2 className="text-3xl font-bold mt-16 text-gray-800">{name}</h2>
        <p className="text-gray-600 mb-4">{email}</p>

        {/* Badge */}
        <span
          className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-white shadow-md mb-4"
          style={{
            background: "linear-gradient(90deg, #FF4500, #FF8C00)",
          }}
        >
          {badge || "No Badge"}
        </span>

        {/* User Stats */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white p-3 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Requested</h3>
            <p className="text-2xl font-bold text-orange-600">{requestedMeal.length}</p>
          </div>

          <div className="bg-white p-3 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Reviews</h3>
            <p className="text-2xl font-bold text-orange-600">{reviewsCount}</p>
          </div>

          <div className="bg-white p-3 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Likes</h3>
            <p className="text-2xl font-bold text-orange-600">{likes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
