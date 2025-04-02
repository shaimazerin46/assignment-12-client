import { useContext } from "react";
import useRequestedMeal from "../../hooks/useRequestedMeal";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import Heading from "../../Components/SmallComponents/Heading";
import toast from "react-hot-toast";

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
                  toast('Deleted',{
                    duration: 1000,
                    style: {color:'black', fontSize:"20px"},
                    icon: '✅'
                })
            }
        })
    }


    return (
        <div className="min-h-screen">
           <Heading text={"Requested meals"}></Heading>

            <div className="overflow-x-auto">
  <table className="table bg-white w-full">
    {/* head */}
    <thead>
      <tr className="text-black">
        <th className="hidden md:block"></th>
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
        filteredData.map((data,idx)=> <tr key={data._id} className="bg-white">
            <th className="hidden md:block">{idx+1}</th>
            <td>{data?.title}</td>
            <td>{data?.like}</td>
            <td>{data?.reviewCount}</td>
            <td>{data?.status}</td>
            <td>
                <button onClick={()=>{handleDelete(data._id)}} className="btn border-0 bg-red-500 text-white">Cancel</button>
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