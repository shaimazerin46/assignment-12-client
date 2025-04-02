
import { Link, NavLink, useNavigate } from "react-router-dom";
import WebButton from "./SmallComponents/webButton";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { MdOutlineNotificationsActive } from "react-icons/md";
import logo from '../assets/images/logo.png'
import useUser from "../hooks/useUser";
import toast from "react-hot-toast";


const Navbar = () => {
  const {user,logout,login} = useContext(AuthContext);
  const [users] = useUser()
  const navigate = useNavigate();
  const [isVisible,setIsVisible] = useState(true);

  const filteredUser = users?.find(u=>u.email===user?.email);

  const handleAdminLogin = ()=>{
    console.log('hi')
    const adminEmail = "shaimazerin@gmail.com";
    const adminPassword = "Asdfgh1";
    login(adminEmail,adminPassword)
    .then(()=>{
      toast('Admin login successfull!',{
        duration: 1000,
        style: {color:'black', fontSize:"20px"},
        icon: '✅'
    })
      navigate('/')
    })
  }
 

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
      user && filteredUser?.role==='admin'? <div>
         <NavLink to='/dashboard/adminProfile'>Dashboard</NavLink>
      </div>: <div>
         <NavLink to='/dashboard/myProfile'>Dashboard</NavLink>
      </div>
    }
    
    </>

    const handleLogout=()=>{
      logout()
       .then(()=>{
                  
                    toast('Successfully logged out!',{
                      duration: 1000,
                      style: {color:'black', fontSize:"20px"},
                      icon: '✅'
                  })
                    
                    navigate('/login')
              })
              .catch(err=>{
                  
                    toast('Logout failed',err,{
                      duration: 1000,
                      style: {color:'black', fontSize:"20px"},
                      icon: '❌'
                  })
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
        className="menu text-black menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <div className="flex gap-1 items-center">
     
      
      
       <img src={logo} alt="" className="h-20 -rotate-12"/>
       
    <span className="text-3xl active logo-font hidden md:block">HostelMeal</span>
    </div>
    
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu text-black menu-horizontal flex items-center px-1 space-x-7 uppercase text-xl">
     {links}
    </ul>
  </div>
  <div className="navbar-end flex md:gap-5 gap-1">
    <button>
    <MdOutlineNotificationsActive />
    </button>
    {
      user? <div className="flex gap-3">
       <div className="profileImage">
       <img src={user.photoURL} className="relative w-10 h-10 object-cover rounded-full" alt=""/>
       <span className="text-sm hidden absolute">{user.displayName}</span>
       </div>
       <button onClick={handleLogout} className="btn border-0 text-white prime_bg rounded-2xl ">Logout</button>
      </div> :  <Link to='/login'>
      <div className="md:flex items-center gap-2">
      <WebButton btn_text={"Join us"}></WebButton>
      <button className="btn mt-1 border-0 prime_bg text-white rounded-xl" onClick={handleAdminLogin}>Admin</button>
      </div>
      </Link>
    }
   
  </div>
 </div>
</div>
       
    );
};

export default Navbar;