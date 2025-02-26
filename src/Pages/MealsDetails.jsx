import { useNavigate, useParams } from "react-router-dom";
import useMeals from "../hooks/useMeals";
import { useForm} from "react-hook-form"
import { FaHeart } from "react-icons/fa";
import { useContext, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../Context/AuthProvider";
import useUser from "../hooks/useUser";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Swal from "sweetalert2";


const MealsDetails = () => {
   
    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const [users] = useUser();
    const [meals,refetch] = useMeals();
    const axiosPublic = useAxiosPublic();
    const axiosPrivate = useAxiosPrivate()
    const filteredMeal = meals?.filter(meal=>meal._id===id);
    const data = filteredMeal[0];
    // console.log(data)
    const [like,setLike] = useState(data?.like || 0);
    const navigate = useNavigate();
    const [reviewsCount, setReviewsCount] = useState(0)

    const filterUser = users?.filter(u=>u.email===user?.email);

    // console.log(meals)

    const {
        register,
        handleSubmit,
      } = useForm()
    //   console.log(filteredMeal[0]?.title)

      const onSubmit = (data) => {
        // console.log(data);
       
        setReviewsCount(prevCount => prevCount + 1);
        const reviewData = {
            mealTitle: filteredMeal[0].title,
            likes: like,
            reviewsCount: reviewsCount+1,
            review: data.review,
            email: user.email
        }
        axiosPrivate.post('/reviews',reviewData)
        .then(res=>{
            // console.log(res.data)
            setReviewsCount(reviewsCount+1)
            if(res.data.insertedId){
                Swal.fire({
                    title: "Good job!",
                    text: "Thank you for review",
                    icon: "success"
                  });
            }

        })
        const review = {reviewsCount: reviewsCount+1}
        axiosPublic.patch(`/meals/${id}`,review)
        .then(()=>{
            // console.log(res.data);
        })

      }
    const handleLikeButton = ()=>{
        if(user){
            const newLikeCount = like+1
        setLike(newLikeCount);
        const likedData = {
                like: newLikeCount
        }
        axiosPublic.patch(`/meals/${id}`,likedData)
        .then(()=>{
            // console.log(res.data);
            refetch();
        })
        }
        else{
            navigate('/login')
        }
    }
  
   
    const handleRequestmeal = ()=>{
        
      if(user){
        if(filterUser[0]?.badge){
            const meal = {
                mealId: data._id,
                title: data.title,
                image: data.image,
                price: data.price,
                category: data.category,
                distributor: data.distributor,
                description: data.description,
                userName: filterUser[0].displayName,
                email:  filterUser[0].email,
                badge: filterUser[0]?.badge,
                status: 'pending',
                like: data.like,
                reviewCount: data.reviewCount
            }
            axiosPrivate.post('/requestedMeal',meal)
            .then(res=>{
                // console.log(res.data)
                if(res.data.insertedId){
                    Swal.fire({
                        title: "Good job!",
                        text: "Meal request done",
                        icon: "success"
                      });
                }
            })
        }
        else{
            Swal.fire({
                title: "No subscription",
                text: "Subscribe a package first",
                icon: "error"
              });
        }
      }
      else{
        navigate('/login')
      }
    }
    return (
        <div>
            <h3 className="pt-50 text-xl text-center">Details of {data?.title}</h3>
            <div className="w-96 mx-auto my-10 space-y-3">
                <img src={data?.image} alt=""
                className="h-[300px] w-full"
                />
                <p className="text-xl">Distributor: {data?.distributor}</p>
                <p>{data?.description}</p>
                <p className="text-xl">Ingredients</p>
                <ul className="list-disc pl-10">
                    {data?.ingredients?.map((ing,idx)=><li className="text-gray-400" key={idx}>{ing}</li>)}
                </ul>
                <p className="btn bg-green-400 text-white">Price: {data?.price}</p>
                <span className="ml-5 px-2 py-1 bg-orange-400 text-white rounded-3xl">Rarting: {data?.rating}</span>
                <p className="text-sm text-gray-400">Posted date: {data?.post_time}</p>
                <div className="flex gap-5 items-center">
                    <div className="text-red-500 text-xl flex gap-1 items-center">
                   <button onClick={handleLikeButton}>
                   <FaHeart 
                     />
                   </button>
                     <span >{like}</span>
                    </div>

                    <button onClick={handleRequestmeal} className="btn bg-orange-400 rounded-2xl text-white text-sm">Request meal</button>
                    <span className="text-gray-500">Total review: {reviewsCount}</span>
                </div>

                {/* review form */}
                <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                <textarea {...register("review")} className="textarea textarea-bordered" placeholder="write your feedback"></textarea>
                <button type="submit" className="mt-3 btn btn-outline rounded-2xl bg-white">Submit</button>
                </form>
                </div>
            </div>
        </div>
    );
};

export default MealsDetails;