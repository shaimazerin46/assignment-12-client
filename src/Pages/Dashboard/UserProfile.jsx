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

  const { name,email, badge } = filteredUser || {};
  const likes = userReviews?.reduce((total, review) => total + (review.likes || 0), 0);
  const reviewsCount = userReviews?.length || 0;

  const requestedMeal = requestedMeals.filter((meal) => meal.email === user.email);

  return (
    <div className="h-full flex flex-col items-center justify-center p-5"
    style={{background: 'linear-gradient(to left, #DDEB9D, #A0C878)'}}
    >
     <div className=" rounded-2xl shadow-2xl relative mx-auto flex gap-5 p-5"
     style={{background: "linear-gradient(to right, #f0f7d0, #ffff)"}}
     >
      <div className="absolute right-10 -top-5">
        <img src={user.photoURL} alt="" className="w-15 shadow-xl h-15 rounded-full"/>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-xl">{name}</h3>
        <p>{email}</p>
        <p className="md:w-[400px]">Welcome to HostelMeals! Easily manage hostel meals, track expenses, and enjoy a seamless dining experience—all in one place!</p>
        <div className="flex flex-wrap gap-7">
            <div>
              <h3 className="font-bold">{badge}</h3>
              <p>Badge</p>
            </div>
            <div>
              <h3 className="font-bold">{likes}</h3>
              <p>Likes</p>
            </div>
            <div>
              <h3 className="font-bold">{reviewsCount}</h3>
              <p>Reviews</p>
            </div>
            <div>
              <h3 className="font-bold">{requestedMeal.length}</h3>
              <p>Requested Meals</p>
            </div>
        </div>
      </div>
     </div>
    </div>
  );
};

export default UserProfile;
