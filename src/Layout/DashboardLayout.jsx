import { Outlet } from "react-router-dom";
import Sidebar from "../Components/DashboardComponent/Sidebar";


const DashboardLayout = () => {
    return (
        <div>
           <div className="grid grid-cols-6 gap-10">
           <Sidebar className='col-span-1'></Sidebar>
           <div className="col-span-5">
            <Outlet></Outlet>
           </div>
           </div>
        </div>
    );
};

export default DashboardLayout;