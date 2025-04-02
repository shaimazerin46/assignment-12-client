import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Heading from "../../Components/SmallComponents/Heading";
import toast from "react-hot-toast";

const AllUsers = () => {
    const [users, refetch] = useUser();
    const axiosPrivate = useAxiosPrivate();
    const axiosPublic = useAxiosPublic();
    const [updatedUsers, setUpdatedUsers] = useState([]);  
    const [search, setSearch] = useState("");

    useEffect(() => {
        axiosPublic.get(`/users?search=${search}`)
            .then(res => setUpdatedUsers(res.data))  
            
    }, [search]);

    const makeAdmin = (id) => {
        axiosPrivate.patch(`/users/admin/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                   
                    toast('Role changed to admin now',{
                        duration: 1000,
                        style: {color:'black', fontSize:"20px"},
                        icon: '✅'
                    })
                    refetch(); 
                }
            })
            .catch(err => {
                  toast(err.message,{
                    duration: 1000,
                    style: {color:'black', fontSize:"20px"},
                    icon: '❌'
                })
            }
            );
    };

    return (
        <div className="min-h-screen">
            <Heading text={"All users"}></Heading>

            {/* Search Input */}
            <div className="text-center mb-4">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    className="input bg-white input-bordered w-1/2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="w-96 mx-auto md:w-full" >
            <table className="overflow-x-auto table">
                    
                    <thead>
                        <tr className="text-black">
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Make Admin</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            updatedUsers.length > 0 ? updatedUsers.map((user, idx) => (
                                <tr key={user._id}>
                                    <th>{idx + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.badge}</td>
                                    <td>
                                        {user.role === 'admin' ? 'Admin' :
                                            <button className='btn button-bg text-white' onClick={() => makeAdmin(user._id)} >
                                               user
                                            </button>
                                        }
                                    </td>
                                </tr>
                            )) : users.map((user, idx) => (
                                <tr key={user._id}>
                                    <th>{idx + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.badge}</td>
                                    <td>
                                        {user.role === 'admin' ? 'Admin' :
                                            <button  onClick={() => makeAdmin(user._id)} className="btn button-bg">
                                                Make Admin
                                            </button>
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
