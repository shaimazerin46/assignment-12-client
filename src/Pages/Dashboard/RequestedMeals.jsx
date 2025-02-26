import { useContext } from "react";
import useRequestedMeal from "../../hooks/useRequestedMeal";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";

const RequestedMeals = () => {
    const [requestedMeals] = useRequestedMeal();
    const {user} = useContext(AuthContext)
    const filteredData = requestedMeals?.filter(requestedMeal=>requestedMeal.email===user.email);
    const axiosPrivate = useAxiosPrivate();
    

    const handleDelete =(id)=>{
        axiosPrivate.delete(`/requestedMeal/${id}`)
        .then(res=>{
            // console.log(res.data)
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
            <h3 className="text-center text-xl py-10">Requested meals</h3>

            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Title</th>
        <th>Likes</th>
        <th>Reviews count</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        filteredData.map((data,idx)=> <tr key={data._id} className="bg-base-200">
            <th>{idx+1}</th>
            <td>{data?.title}</td>
            <td>{data?.like}</td>
            <td>{data?.reviewCount}</td>
            <td>{data?.status}</td>
            <td>
                <button onClick={()=>{handleDelete(data._id)}} className="btn btn-error text-white">Cancel</button>
            </td>
          </tr>)
      }
     
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default RequestedMeals;