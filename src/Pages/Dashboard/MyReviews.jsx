import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import Heading from "../../Components/SmallComponents/Heading";
import toast from "react-hot-toast";


const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState();
  const axiosPublic = useAxiosPublic();
  const axiosPrivate = useAxiosPrivate()


  useEffect(() => {
    axiosPublic.get('/reviews')
      .then(res => {
        setReviews(res.data)
      })
  })

  const handleDelete = (id) => {
    axiosPrivate.delete(`/reviews/${id}`)
      .then(res => {
        // console.log(res.data)
        if (res.data.deletedCount > 0) {
          
          toast('Deleted',{
            duration: 1000,
            style: {color:'black', fontSize:"20px"},
            icon: '✅'
        })
        }
      })
  }

  const filteredReviews = user ? reviews?.filter(review => review.email === user.email) : [];

  return (
    <div className="min-h-screen">
      <Heading text={"My reviews"}></Heading>

      <div className=" overflow-x-auto">
        <table className="table bg-white w-full min-w-[600px]">
          {/* head */}
          <thead>
            <tr className="text-black">
              <th className="hidden md:block"></th>
              <th>Title</th>
              <th>Likes</th>
              <th>Review</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredReviews?.map((filteredReview, idx) => <tr key={filteredReview._id} className="bg-white">
                <th className="hidden md:block">{idx + 1}</th>
                <td>{filteredReview?.mealTitle}</td>
                <td>{filteredReview.like}</td>
                <td>{filteredReview.review}</td>
                <td className="flex gap-2">
                  <Link to={`/dashboard/editReview/${filteredReview._id}`}>
                    <button className="btn border-0 button-bg text-white">Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(filteredReview._id)} className="btn bg-red-500 border-0 text-white">Delete</button>
                  <Link className="text-blue-500 underline flex items-center" to={`/meals/${filteredReview._id}`}>View meal</Link>
                </td>
              </tr>)
            }


          </tbody>
        </table>


      </div>
    </div>
  );
};

export default MyReviews;


