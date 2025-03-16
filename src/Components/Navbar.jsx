
import { Link, NavLink, useNavigate } from "react-router-dom";
import WebButton from "./SmallComponents/webButton";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import Swal from "sweetalert2";
import { MdOutlineNotificationsActive } from "react-icons/md";
import logo from '../assets/images/logo.png'

const Navbar = () => {
  const {user,logout} = useContext(AuthContext);
  const navigate = useNavigate();
  const [isVisible,setIsVisible] = useState(true);

  useEffect(()=>{
    const handleScroll = ()=>{
      const currentScroll = window.scrollY;
      setIsVisible(currentScroll<500)
    }
    window.addEventListener('scroll',handleScroll);
    return ()=>{
      window.removeEventListener('scroll',handleScroll);
    }
  },[])
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
      <div
      className={`w-full py-5 bg-white fixed z-10 backdrop-blur-md prime_color transition-all duration-500 ease-in-out ${
          isVisible ? 'lg:top-[40px]' : 'lg:top-0'
      } top-0`} 
  >
            <div className="navbar max-w-7xl mx-auto flex items-center justify-between">
        
      

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
        className="menu text-black menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <div className="flex gap-1 items-center">
     
       <div className="text-green-500 md:text-6xl -rotate-12">
      
       <img src={logo} alt="" className="h-20"/>
       </div>
    <span className="text-3xl active logo-font hidden md:block">HostelMeal</span>
    </div>
    
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu text-black menu-horizontal px-1 space-x-7 uppercase text-xl">
     {links}
    </ul>
  </div>
  <div className="navbar-end flex md:gap-5 gap-2">
    <button>
    <MdOutlineNotificationsActive />
    </button>
    {
      user? <div className="flex gap-3">
       <div className="profileImage">
       <img src={user.photoURL} className="relative w-10 h-10 object-cover rounded-full" alt=""/>
       <span className="text-sm hidden absolute">{user.displayName}</span>
       </div>
       <button onClick={handleLogout} className="btn text-white prime_bg rounded-2xl text-xl">Logout</button>
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