
import { NavLink } from "react-router-dom";
import WebButton from "./SmallComponents/webButton";
import { IoFastFoodOutline } from "react-icons/io5";

const Navbar = () => {
    const links = <>
    <NavLink to='/'>Home</NavLink>
    <NavLink>Meals</NavLink>
    <NavLink>Upcoming Meals</NavLink>
    <NavLink></NavLink>
    
    </>
    return (
        <div>
            <div className="navbar py-7 fixed backdrop-blur-md max-w-7xl mx-auto bg-transparent z-10 text-orange-400 text-xl ">
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
      <img 
      className="w-5"
      src="https://img.icons8.com/?size=50&id=11642&format=png" alt=""/>
    </button>
     <WebButton btn_text={"Join us"}></WebButton>
  </div>
</div>
        </div>
    );
};

export default Navbar;