import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import useUser from "../../hooks/useUser";
import { FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [users] = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const currentUser = users?.find((u) => u.email === user?.email);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="relative min-h-screen">
      {/* Hamburger Icon - Visible on Small Screens */}
      <button
        onClick={toggleSidebar}
        className="md:hidden absolute top-4 left-4 z-20 text-3xl"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-orange-200 p-5 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static fixed top-0 left-0 w-2/6 md:w-full h-full z-10`}
      >
        <h3 className="p-3 font-bold pt-20">
          {currentUser?.role === "admin" ? "Admin Dashboard" : "User Dashboard"}
        </h3>

        <ul className="p-3 space-y-5">
          {currentUser?.role === "admin" ? (
            <>
              <li><NavLink to="/dashboard/adminProfile">Admin Profile</NavLink></li>
              <li><NavLink to="/dashboard/allUser">Manage Users</NavLink></li>
              <li><NavLink to="/dashboard/addMeal">Add Meal</NavLink></li>
              <li><NavLink to="/dashboard/allMeals">All Meals</NavLink></li>
              <li><NavLink to="/dashboard/allReview">All Reviews</NavLink></li>
              <li><NavLink to="/dashboard/servedMeal">Serve Meals</NavLink></li>
              <li><NavLink to="/dashboard/upcomingMeal">Upcoming meals</NavLink></li>
            </>
          ) : (
            <>
              <li><NavLink to="/dashboard/myProfile">My Profile</NavLink></li>
              <li><NavLink to="/dashboard/requestedMeals">Requested Meals</NavLink></li>
              <li><NavLink to="/dashboard/myReview">My Reviews</NavLink></li>
              <li><NavLink to="/dashboard/paymentHistory">Payment History</NavLink></li>
            </>
          )}
        </ul>

        <div className="divider"></div>
        <ul className="p-3 space-y-5">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/allMeal">Meals</NavLink></li>
          <li><NavLink to="/upcomingMeals">Upcoming meals</NavLink></li>
        </ul>
      </div>

      {/* Close menu when link clicked (small screens) */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-transparent bg-opacity-50 z-0"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;