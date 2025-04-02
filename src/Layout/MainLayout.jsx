import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import TimeBar from "../Components/HomeComponents/TimeBar";
import { Toaster } from "react-hot-toast";




const MainLayout = () => {

    return (
       <div>
            <TimeBar></TimeBar>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            <Toaster/>
        </div>
       
    );
};

export default MainLayout;