import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import TimeBar from "../Components/HomeComponents/TimeBar";




const MainLayout = () => {

    return (
       <div>
            <TimeBar></TimeBar>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
       
    );
};

export default MainLayout;