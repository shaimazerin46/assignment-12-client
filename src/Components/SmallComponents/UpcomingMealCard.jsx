
import { FaHeart } from "react-icons/fa";


import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import useUser from "../../hooks/useUser";
import PropTypes from "prop-types";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const UpcomingMealCard = ({upcomingMeal}) => {
    const [like,setLike] = useState(upcomingMeal.like||0)
    const [liked,setLiked] = useState(false);
    const [users] = useUser()
    const {user} = useContext(AuthContext);
    const axiosPrivate = useAxiosPrivate()

    const loggedUser = users?.find(u=>u.email===user?.email);

    const handleLikeButton = (id) =>{
        console.log(id)
        if (!(loggedUser?.badge === "Gold" || loggedUser?.badge === "Silver" || loggedUser?.badge === "Platinum")) {
            console.log("Subscribe to a package");
            return;
        }
        if(liked){
            console.log("you can like only once");
            return;
        }
      
            const newLike = like + 1;
            setLike(newLike);
            setLiked(true);
            const addLike = {
                like: newLike
            }
            axiosPrivate.patch(`/upcomingMeals/${id}`,addLike)
            .then((res)=>{
                console.log(res.data)
            })
        


    }
    return (
        <div  className="card card-compact bg-base-100 h-full flex flex-col shadow-xl">
                        <figure>
                            <img
                                src={upcomingMeal?.image}
                                className="h-[250px] object-cover w-full"
                                alt={upcomingMeal?.title} />
                        </figure>
                        <div className="card-body flex flex-grow">
                            <h2 className="card-title">{upcomingMeal?.title}</h2>
                            <p>Rating: {upcomingMeal?.rating}</p>
                            <p>Price: {upcomingMeal?.price}</p>
                            <div className="text-red-500 text-xl flex gap-1 items-center">
                                           <button onClick={()=>handleLikeButton(upcomingMeal._id)}>
                                           <FaHeart 
                                             />
                                           </button>
                                             <span>{like}</span>
                                             
                                            </div>
                        </div>
                       

                    </div>
    );
};

UpcomingMealCard.propTypes = {
    upcomingMeal: PropTypes.object
}

export default UpcomingMealCard;