import { Link } from "react-router-dom";
import useMeals from "../../hooks/useMeals";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";


const Allmeal = () => {
    const [meals,refetch] = useMeals();
    const axiosPrivate = useAxiosPrivate()
    
  
    const handledelete = (id) =>{
       axiosPrivate.delete(`/meals/${id}`)
       .then(res=>{
        console.log(res.data)
        if(res.data.deletedCount>0){
            Swal.fire({ icon: "success", title: "Successfully deleted" });
                                refetch();
        }
       })
    }
    return (
        <div>
            <h3 className="text-center py-10 text-xl">All meal</h3>

            <div className="">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Title</th>
        <th>Distributor name</th>
        <th>Rating</th>
        <th>Likes</th>
        <th>Reviews count</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {
        meals.map((meal,idx)=> <tr key={meal._id}>
            <th>{idx+1}</th>
            <td>{meal.title}</td>
            <td>{meal.distributor}</td>
            <td>{meal.rating}</td>
            <td>{meal.like}</td>
            <td>{meal.reviewCount}</td>
            <td>
                <Link to={`/dashboard/updateMeal/${meal._id}`}>
                <button
                 className="btn mr-3 mb-2 btn-accent text-white btn-sm">Update</button>
                </Link>
                <button onClick={()=>handledelete(meal._id)} className="btn btn-sm btn-error text-white">Delete</button>
            </td>
            <td><Link to={`/meals/${meal._id}`}>View meal</Link></td>
          </tr>)
      }
     
      
    </tbody>
  </table>
</div>
 

        </div>
    );
};

export default Allmeal;