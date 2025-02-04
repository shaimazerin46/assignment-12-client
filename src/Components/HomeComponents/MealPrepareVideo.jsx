import { MdOutlineSlowMotionVideo } from 'react-icons/md';
import videoImg from '../../assets/images/video.jpg'

const MealPrepareVideo = () => {
    return (
        <div 
        style={{
            background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),url(${videoImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}
        className="mb-20 h-[400px] flex items-center justify-center">
           <a href='https://youtu.be/NujQPa2oNdA?si=alHE8VlAuJO_pFLG' target='_blank'>
           <p className='text-white text-[120px] flex justify-center mb-5'>
            <MdOutlineSlowMotionVideo />
            </p>
            <p className='text-white text-2xl text-center '>SEE HOW WE PREPARE YOUR MEAL</p>
           </a>
            
        </div>
    );
};

export default MealPrepareVideo;