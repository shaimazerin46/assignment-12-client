import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { IoMdClose } from "react-icons/io";
import logo from '../../assets/images/logo.png'
import useUser from "../../hooks/useUser";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { LuActivity } from "react-icons/lu";
import useMeals from "../../hooks/useMeals";


const AdminStats = () => {
    const {user} = useContext(AuthContext);
    const [isModalOpen,setModalOpen]  = useState(false);
    const [users] = useUser();
    const [meals] = useMeals();
    const [logs,setLogs] = useState();
    const axiosPublic = useAxiosPublic();

    const filterUser = users?.find(u=>u?.email===user?.email);
    console.log(filterUser);

    const filterMeals = meals?.filter((meal) => meal?.email === user?.email);

    const filterLog = logs?.filter(log=>log.adminEmail===user?.email)

    const modalFunction = ()=>{
        setModalOpen(!isModalOpen)
    }

    useEffect(()=>{
        axiosPublic.get('/log')
        .then(res=>{
            setLogs(res.data)
        })
    },[])
    return (
        <div>

            {/* Dashboard navbar */}
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="" className="w-20 hidden md:block"/>
                    <label className="input hidden md:flex">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                        <input type="search" className="grow" placeholder="Search" />
                    </label>
                </div>
                <div onClick={modalFunction}>
                    <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full"/>
                </div>
            </div>


            {/* Modal */}
            {
                isModalOpen && (
                    <div className="right-10 absolute text-center p-5 shadow-xl space-y-3">
                        <h3 className="font-bold">Welcome {user.displayName}!</h3>
                        <h3>Email: {user.email}</h3>
                        <button onClick={modalFunction} className="font-bold flex items-center gap-1 justify-center">Close <span className="text-red-500"><IoMdClose /></span></button>
                    </div>
                )
            }

            {/* content */}
            <div className="md:flex mt-20 gap-5">
                <div>
                    <img src={user.photoURL} alt="" className="w-[400px] object-cover h-[300px]"/>
                </div>
                <div className="w-full ">
                    <h3 className="font-bold text-xl mt-5 md:mt-0 mb-5">My profile</h3>
                    <div className="shadow-2xl rounded-xl p-5 space-y-5">
                        <h3 className="font-bold">Personal Information</h3>
                        <div className="md:flex flex-grow gap-20">
                            <div>
                                <h3 className="font-bold">Name</h3>
                                <p>{user.displayName}</p>
                            </div>
                            
                            <div>
                                <h3 className="font-bold">Email</h3>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h3 className="font-bold">Role</h3>
                                <p>{filterUser?.role}</p>
                            </div>
                            <div>
                                <h3 className="font-bold">Badge</h3>
                                <p>{filterUser?.badge}</p>
                            </div>
                            <div>
                                <h3 className="font-bold">Added meals</h3>
                                <p>{filterMeals?.length}</p>
                            </div>
                        </div>
                        {/* activity log */}
                        <div className="space-y-3">
                        <h3 className="font-bold">Activity log</h3>
                        <div className="flex items-center gap-5">
                        <span className="p-4 rounded-full border-[1px] text-blue-500"><LuActivity /></span>
                        <p className="font-bold">{filterLog?.length} activity</p>
                            
                        </div>
                        <div>
                                {
                                    filterLog?.map(l=>(
                                        <div key={l._id} className="p-3 border-[1px] mb-3">
                                            <p>{l?.action} at {l?.timeStamp}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminStats;