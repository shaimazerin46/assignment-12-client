import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import useUser from "../../hooks/useUser";


const Sidebar = () => {
    const { user } = useContext(AuthContext);
    const [users] = useUser();

    // Find the current user based on email
    const currentUser = users?.find(u => u.email === user?.email);

    return (
        <div className="h-screen bg-orange-200 p-5">
            {currentUser?.role === 'admin' ? (
                // Admin dashboard
                <div>
                    <h3 className="p-3 font-bold">Admin Dashboard</h3>
                    <ul className="p-3 space-y-5">
                        <li><NavLink to='/dashboard/adminProfile'>Admin Profile</NavLink></li>
                        <li><NavLink to='/dashboard/allUser'>Manage Users</NavLink></li>
                        <li><NavLink to='/dashboard/addMeal'>Add Meal</NavLink></li>
                        <li><NavLink to='/dashboard/allMeals'>All Meals</NavLink></li>
                        <li><NavLink to='/dashboard/allReview'>All Reviews</NavLink></li>
                        <li><NavLink to='/dashboard/servedMeal'>Serve Meals</NavLink></li>
                    </ul>
                </div>
            ) : (
                // User dashboard
                <div>
                    <h3 className="p-3 font-bold">User Dashboard</h3>
                    <ul className="p-3 space-y-5">
                        <li><NavLink to='/dashboard/myProfile'>My Profile</NavLink></li>
                        <li><NavLink to='/dashboard/requestedMeals'>Requested meals</NavLink></li>
                        <li><NavLink to='/dashboard/myReview'>My Reviews</NavLink></li>
                        <li>
                            <NavLink to='/dashboard/paymentHistory'>Payment History</NavLink>
                        </li>
                    </ul>
                </div>
            )}

         <div className="divider"></div>
            <ul className="p-3 space-y-5">
                <li>
                    <NavLink to='/'>Home</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
