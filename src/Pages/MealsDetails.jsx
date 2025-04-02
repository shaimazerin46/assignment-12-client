import { useNavigate, useParams } from "react-router-dom";
import useMeals from "../hooks/useMeals";
import { useForm} from "react-hook-form"
import { FaHeart } from "react-icons/fa";
import { useContext, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../Context/AuthProvider";
import useUser from "../hooks/useUser";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import toast from "react-hot-toast";
import Heading from "../Components/SmallComponents/Heading";
import { AiOutlineSend } from "react-icons/ai";


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
                
                  toast('Thank you for review',{
                    duration: 1000,
                    style: {color:'black', fontSize:"20px"},
                    icon: '🎁'
                })
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
                   
                      toast('Meal request done',{
                        duration: 1000,
                        style: {color:'black', fontSize:"20px"},
                        icon: '✅'
                    })
                }
            })
        }
        else{
           
              toast('Subscribe a package first',{
                duration: 1000,
                style: {color:'black', fontSize:"20px"},
                icon: '❌'
            })
        }
      }
      else{
        navigate('/login')
      }
    }
    return (
        <div style={{background: "linear-gradient(to right, #A5B68D, #fffff, #8cad5e)"}}>
            
          <div className="md:pt-60 pt-40">

          <div className="md:w-[700px] md:mx-auto mx-2 md:mb-20 mb-5 space-y-3 rounded-xl shadow-2xl bg-white md:p-5 p-2">
                <img src={data?.image} alt=""
                className="md:h-[300px] h-[200px] rounded-xl w-full object-cover"
                />
                <p className="text-xl font-bold text-center">{data?.title}</p>
                <p className="font-bold">Distributor: {data?.distributor}</p>
                <p>{data?.description}</p>
                <p className="font-bold">Ingredients</p>
                <ul className="list-disc pl-10">
                    {data?.ingredients?.map((ing,idx)=><li className="text-gray-400" key={idx}>{ing}</li>)}
                </ul>
              <div className="flex gap-5">
              <p className="font-bold">Price: {data?.price}</p>
              <span className="ml-5 px-2 py-1 bg-[#e7a11f] text-white rounded-3xl">Rarting: {data?.rating}</span>
              </div>
                <p className="text-sm ">Posted date: {data?.post_time}</p>
                <div className="flex gap-5 items-center">
                    <div className="text-red-500 text-xl flex gap-1 items-center">
                   <button onClick={handleLikeButton}>
                   <FaHeart 
                     />
                   </button>
                     <span >{like}</span>
                    </div>

                    <button onClick={handleRequestmeal} className="btn bg-[#e7a11f] rounded-2xl text-white text-sm">Request meal</button>
                    <span className="text-gray-500">Total review: {reviewsCount}</span>
                </div>

                {/* review form */}
              
            </div>

            <div className=" md:w-[700px] mx-2 md:mx-auto md:pb-20 pb-10">
               <div className="shadow-2xl  rounded-xl bg-white">
               <Heading text={"Feedback"}></Heading>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full p-5">
                <textarea {...register("review")} className="textarea textarea-bordered w-full border-0 border-b-[1px] focus:outline-0 resize-none" placeholder="write your feedback"></textarea>
                <button type="submit" className="mt-3 flex items-center gap-1">
                     <span>
                                                <AiOutlineSend/>
                                                </span>
                                                send
                </button>
                </form>
               </div>
                </div>

          </div>
        </div>
    );
};

export default MealsDetails;