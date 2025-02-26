import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";


const MyReviews = () => {
    const {user} = useContext(AuthContext);
    const [reviews,setReviews] = useState();
    const axiosPublic = useAxiosPublic();
    const axiosPrivate = useAxiosPrivate()


    useEffect(()=>{
        axiosPublic.get('/reviews')
        .then(res=>{
            setReviews(res.data)
        })
    })

   const handleDelete = (id)=>{
    axiosPrivate.delete(`/reviews/${id}`)
    .then(res=>{
      console.log(res.data)
      if(res.data.deletedCount>0){
         Swal.fire({
                            title: "Good job!",
                            text: "Deleted!",
                            icon: "success"
                          });
      }
    })
   }

    const filteredReviews = user ? reviews?.filter(review => review.email === user.email) : [];
    
    return (
        <div>
            <h3 className="text-center text-xl py-10">My reviews</h3>

            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Title</th>
        <th>Likes</th>
        <th>Review</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        filteredReviews?.map((filteredReview,idx)=><tr key={filteredReview._id} className="bg-base-200">
            <th>{idx+1}</th>
            <td>{filteredReview?.mealTitle}</td>
            <td>{filteredReview.like}</td>
            <td>{filteredReview.review}</td>
            <td className="flex gap-2">
              <Link to={`/dashboard/editReview/${filteredReview._id}`}> 
              <button  className="btn btn-accent text-white">Edit</button>
              </Link>
                <button onClick={()=>handleDelete(filteredReview._id)} className="btn btn-error text-white">Delete</button>
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