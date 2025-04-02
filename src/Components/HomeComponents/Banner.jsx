import { MdLocationSearching } from 'react-icons/md';
import bannerImg from '../../assets/images/banner.jpg'

const Banner = () => {
    return (
        <div
            style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bannerImg})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }}
            className=' text-white py-20 md:py-50 space-y-3 md:space-y-7'
        >
            
          
           <h3 className='text-3xl pt-20 text-center'>Smart Hostel Management System</h3>
            <p className='md:w-[700px]  mx-auto text-center'>Effortlessly manage hostel meals with a seamless ordering, tracking, and administration system. Simplify meal planning, track payments, and enhance dining experiences—all in one platform!</p>
            <div className='flex md:w-1/3 w-3/4 mx-auto justify-center h-15 border-[1px] rounded-3xl'>
            <input type="text" placeholder='Search...' className='border-0 w-full p-5 rounded-3xl focus:outline-none'/>
            <div className='flex items-center pr-5 text-2xl prime_color'>
            <MdLocationSearching/>
            </div>
            </div>
          

        </div>
    );
};

export default Banner;