import { FaPhoneFlip } from "react-icons/fa6";
import useLocation from "../../hooks/useLocation";
import { IoLocationSharp, IoTimeSharp } from "react-icons/io5";
import { useEffect, useState } from "react";



const TimeBar = () => {
    const { address, error } = useLocation();
    const date = new Date().toUTCString();
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            // console.log("Current Scroll:", currentScroll, "Visible:", currentScroll <= 500); 
            setVisible(currentScroll <= 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (

        <div
            className={`bg-black text-white h-10 w-full fixed top-0 z-20 transition-all duration-500 ease-in-out hidden lg:block ${visible ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            <div className="max-w-7xl mx-auto font-bold h-full grid grid-cols-2 items-center">
                <div className="flex gap-5  h-full items-center">
                    <p className="flex items-center gap-2 ">

                        <FaPhoneFlip />

                        <span>017********</span>
                    </p>
                    {address && <p className="flex gap-2 items-center">
                        <IoLocationSharp />
                        <span>
                            {address}
                        </span>
                    </p>}
                </div>
                <div className="ml-auto">
                    <p className="flex gap-2 items-center">
                        <IoTimeSharp />
                        {date}
                    </p>
                </div>
            </div>
            {error && <p>{error.message}</p>}

        </div>
    );
};

export default TimeBar;