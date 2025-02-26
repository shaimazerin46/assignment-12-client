import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";


const AllReview = () => {
    const [reviews,setReviews] = useState();
    const axiosPublic = useAxiosPublic();
    const axiosPrivate = useAxiosPrivate();
    
    useEffect(()=>{
        axiosPublic.get('/reviews')
        .then(res=>{
            setReviews(res.data)
        })
    },[])

    const handleDelete = (id)=>{
        axiosPrivate.delete(`/reviews/${id}`)
        .then(res=>{
            console.log(res.data)
            if(res.data.deletedCount>0){
                Swal.fire({
                    title: "Good job!",
                    text: "Successfully deleted!",
                    icon: "success"
                  });
            }
        })
    }
    return (
        <div>
            <h3 className="text-center text-xl py-10">All reviews</h3>
            <div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Title</th>
        <th>Likes</th>
        <th>Reviews count</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        reviews?.map((review,idx)=><tr key={review._id} className="bg-base-200">
            <th>{idx+1}</th>
            <td>{review?.mealTitle}</td>
            <td>{review?.likes}</td>
            <td>{review.reviewsCount}</td>
            <td>
                <button onClick={()=>handleDelete(review._id)} className="btn btn-error text-white">
                Delete
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

export default AllReview;