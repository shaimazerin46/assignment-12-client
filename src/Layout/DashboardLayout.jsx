import { Outlet } from "react-router-dom";
import Sidebar from "../Components/DashboardComponent/Sidebar";


const DashboardLayout = () => {
    return (
        <div>
           <div className="grid grid-cols-4 md:grid-cols-6  md:gap-10 gap-1">
           <Sidebar className='md:col-span-1 col-span-1'></Sidebar>
           <div className="md:col-span-5 col-span-3">
            <Outlet></Outlet>
           </div>
           </div>
        </div>
    );
};

export default DashboardLayout;