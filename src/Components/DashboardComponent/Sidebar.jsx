import { NavLink } from "react-router-dom";


const Sidebar = () => {
    return (
        <div className="w-[200px] h-screen bg-orange-200">
            <ul className="p-3">
                <NavLink to='/dashboard/addMeal'>Add meal</NavLink>
            </ul>
        </div>
    );
};

export default Sidebar;