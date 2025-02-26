import { NavLink } from "react-router-dom";


const Sidebar = () => {
    return (
        <div className="h-screen bg-orange-200">
            <h3 className="p-3 font-bold">Admin dashboard</h3>
            <ul className="p-3 space-y-5">
                <li>
                    <NavLink to='/dashboard'>Admin profile</NavLink>
                </li>
               <li>
               <NavLink to='/dashboard/allUser'>Manage user</NavLink>
               </li>
                <li>
                <NavLink to='/dashboard/addMeal'>Add meal</NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard/allMeals'>All meals</NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard/allReview'>All review</NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard/servedMeal'>
                        Serve meals
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;