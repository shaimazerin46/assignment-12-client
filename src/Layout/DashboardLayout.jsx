import { Outlet } from "react-router-dom";
import Sidebar from "../Components/DashboardComponent/Sidebar";
import { useState } from "react";


const DashboardLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
    return (

        <div className="flex min-h-screen">
        
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
  
        <div
          className={`flex-grow p-4 transition-all duration-300 ease-in-out ${
            isOpen ? "hidden md:block" : "block"
          }`}
        >
          <Outlet />
        </div>
      </div>
    );
};

export default DashboardLayout;