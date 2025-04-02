import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Heading from "../../Components/SmallComponents/Heading";
import toast from "react-hot-toast";


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
            // console.log(res.data)
            if(res.data.deletedCount>0){
                  toast('Successfully deleted!',{
                    duration: 1000,
                    style: {color:'black', fontSize:"20px"},
                    icon: '✅'
                })
            }
        })
    }
    return (
        <div className="min-h-screen">
          <Heading text={"Reviews"}></Heading>
            <div>
            <div className="overflow-x-auto">
  <table className="table bg-white">
    {/* head */}
    <thead>
      <tr className="text-black">
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
                <button onClick={()=>handleDelete(review._id)} className="btn bg-red-500 text-white">
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