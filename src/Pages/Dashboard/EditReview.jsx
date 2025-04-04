import { useContext, useEffect, useState } from "react";
import { useForm} from "react-hook-form"
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
const EditReview = () => {
    const {user} = useContext(AuthContext);
    const {id} = useParams();
    const [reviews,setReviews] = useState();
    const axiosPublic = useAxiosPublic();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
     useEffect(()=>{
            axiosPublic.get('/reviews')
            .then(res=>{
                setReviews(res.data)
            })
        })

        const filteredReviews = user ? reviews?.find(review => review.email === user.email) : [];
        

    const {
        register,
        handleSubmit,
      } = useForm()

    const onSubmit = (data) => {
        // console.log(data);
        const updatedReview = {
            review: data.review
        }
        axiosPrivate.patch(`/reviews/${id}`,updatedReview)
        .then(res=>{
            // console.log(res.data);
            if(res.data.modifiedCount>0){
                toast('Successfully updated',{
                    duration: 1000,
                    style: {color:'black', fontSize:"20px"},
                    icon: '✅'
                })
                  navigate('/dashboard/myReview')
            }
        })

    }
    return (
        <div className="min-h-screen">
            <h3 className="text-center text-xl py-10">Edit review</h3>
           <div className="w-96 mx-auto">
           <form onSubmit={handleSubmit(onSubmit)}>
                <textarea
                defaultValue={filteredReviews?.review}
                 {...register("review")} className="textarea bg-white textarea-bordered" placeholder="write your feedback"></textarea><br/>
                <button type="submit" className="mt-3 btn  btn-outline rounded-2xl bg-white">Submit</button>
            </form>
           </div>
        </div>
    );
};

export default EditReview;