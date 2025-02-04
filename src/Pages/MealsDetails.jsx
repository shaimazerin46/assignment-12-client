import { useParams } from "react-router-dom";
import useMeals from "../hooks/useMeals";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";


const MealsDetails = () => {
    const {id} = useParams();
    const [meals,refetch] = useMeals();
   const axiosPublic = useAxiosPublic()
    const filteredMeal = meals?.filter(meal=>meal._id===id);
    const data = filteredMeal[0];
    const [like,setLike] = useState(data?.like || 0)
    const handleLikeButton = ()=>{
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
                <div>
                    <div className="text-red-500 text-xl flex gap-1 items-center">
                   <button onClick={handleLikeButton}>
                   <FaHeart 
                     />
                   </button>
                     <span >{like}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealsDetails;