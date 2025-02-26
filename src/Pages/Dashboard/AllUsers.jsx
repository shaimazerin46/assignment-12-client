import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

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
                    Swal.fire({
                        title: "Good job!",
                        text: "Role changed to admin now",
                        icon: "success"
                    });
                    refetch(); 
                }
            })
            .catch(err => {

                Swal.fire({
                    icon: "error",
                   
                    text: (err.message),
                   
                  });
            }
            );
    };

    return (
        <div>
            <h3 className="py-10 text-xl text-center">Manage User</h3>

            {/* Search Input */}
            <div className="text-center mb-4">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    className="input input-bordered w-1/2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto ">
                <table className="table">
                    
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Make Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            updatedUsers.length > 0 ? updatedUsers.map((user, idx) => (
                                <tr key={user._id}>
                                    <th>{idx + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.badge}</td>
                                    <td>
                                        {user.role === 'admin' ? 'Admin' :
                                            <button onClick={() => makeAdmin(user._id)} className="btn">
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
                                            <button onClick={() => makeAdmin(user._id)} className="btn">
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
