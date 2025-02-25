import { NavLink } from "react-router-dom";


const Sidebar = () => {
    return (
        <div className="w-[200px] h-screen bg-orange-200">
            <ul className="p-3">
               <li>
               <NavLink to='/dashboard/allUser'>Manage user</NavLink>
               </li>
                <li>
                <NavLink to='/dashboard/addMeal'>Add meal</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;