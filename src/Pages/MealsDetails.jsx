import { useNavigate, useParams } from "react-router-dom";
import useMeals from "../hooks/useMeals";
import { CiHeart } from "react-icons/ci";
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
    const [like,setLike] = useState(data?.like || 0);
    const navigate = useNavigate()


    const handleLikeButton = ()=>{
        if(user){
            const newLikeCount = like+1
        setLike(newLikeCount);
        const likedData = {
                like: newLikeCount
        }
        axiosPublic.patch(`/meals/${id}`,likedData)
        .then(res=>{
            console.log(res.data);
            refetch();
        })
        }
        else{
            navigate('/login')
        }
    }
    const filterUser = users?.filter(u=>u.email===user?.email);
   
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
                status: 'pending'
            }
            axiosPrivate.post('/requestedMeal',meal)
            .then(res=>{
                console.log(res.data)
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
                    {data?.ingredients.map((ing,idx)=><li className="text-gray-400" key={idx}>{ing}</li>)}
                </ul>
                <p className="btn bg-green-400 text-white">Price: {data?.price}</p>
                <span className="ml-5 px-2 py-1 bg-orange-400 text-white rounded-3xl">Rarting: {data?.rating}</span>
                <p className="text-sm text-gray-400">Posted date: {data?.post_time}</p>
                <div className="flex gap-5">
                    <div className="text-red-500 text-xl flex gap-1 items-center">
                   <button onClick={handleLikeButton}>
                   <FaHeart 
                     />
                   </button>
                     <span >{like}</span>
                    </div>

                    <button onClick={handleRequestmeal} className="btn bg-orange-400 rounded-2xl text-white text-sm">Request meal</button>
                </div>
            </div>
        </div>
    );
};

export default MealsDetails;