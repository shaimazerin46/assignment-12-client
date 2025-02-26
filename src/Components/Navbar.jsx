
import { Link, NavLink, useNavigate } from "react-router-dom";
import WebButton from "./SmallComponents/webButton";
import { IoFastFoodOutline } from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import Swal from "sweetalert2";
import { MdOutlineNotificationsActive } from "react-icons/md";

const Navbar = () => {
  const {user,logout} = useContext(AuthContext);
  const navigate = useNavigate()
    const links = <>
    <NavLink to='/'>Home</NavLink>
    <NavLink to='/allMeal'>Meals</NavLink>
    <NavLink to='/upcomingMeals'>Upcoming Meals</NavLink>
    {
      user && <div>
         <NavLink to='/dashboard'>Dashboard</NavLink>
      </div>
    }
    </>

    const handleLogout=()=>{
      logout()
       .then(()=>{
                  Swal.fire({
                      title: "Good job!",
                      text: "Successfully logged out!",
                      icon: "success"
                    });
                    
                    navigate('/login')
              })
              .catch(err=>{
                  Swal.fire({
                      title: "Registration failed",
                      text: (err.message),
                      icon: "error"
                    });
              })
    }
    return (
        <div>
            <div className="navbar py-5 fixed backdrop-blur-md max-w-7xl mx-auto bg-transparent z-10 text-orange-400 text-xl ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <div className="flex gap-2">
      {/* <img
      className="w-10"
       src="https://img.icons8.com/?size=80&id=2GPy2A8dxonI&format=png" alt=""/> */}
       <div className="text-green-500 text-6xl -rotate-12">
       <IoFastFoodOutline />
       </div>
    <a className=" text-md flex items-center italic font-light">HostelMeals</a>
    </div>
    
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 space-x-5">
     {links}
    </ul>
  </div>
  <div className="navbar-end flex gap-5">
    <button>
    <MdOutlineNotificationsActive />
    </button>
    {
      user? <div className="flex gap-3">
       <div className="profileImage">
       <img src={user.photoURL} className="relative w-10 h-10 object-cover rounded-full" alt=""/>
       <span className="text-sm hidden absolute">{user.displayName}</span>
       </div>
       <button onClick={handleLogout} className="btn text-white bg-orange-400 rounded-2xl">Logout</button>
      </div> :  <Link to='/login'>
      <WebButton btn_text={"Join us"}></WebButton>
      </Link>
    }
  </div>
</div>
        </div>
    );
};

export default Navbar;