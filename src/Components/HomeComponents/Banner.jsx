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
            className=' text-white py-10 md:py-30 space-y-3 md:space-y-7'
        >
            
            <h3 className='text-3xl text-center'>Smart Hostel Management System</h3>
            <p className='w-[600px] mx-auto text-center'>Effortlessly manage hostel accommodations with a seamless booking, tracking, and administration system.Simplify room assignments, track payments, and enhance student living experiences—all in one platform!</p>
            <div className='flex md:w-1/3 w-1/2 mx-auto justify-center h-15 border-[1px] rounded-3xl'>
            <input type="text" placeholder='Search...' className='border-0'/>
            <div className='flex items-center text-2xl text-orange-400'>
            <MdLocationSearching/>
            </div>
            </div>

        </div>
    );
};

export default Banner;