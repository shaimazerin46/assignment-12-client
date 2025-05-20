import PropTypes from "prop-types";
import { SiComma } from "react-icons/si";


const TestCard = ({image, name, text}) => {
    return (
         <div>
                    <div className="md:flex justify-between items-center px-3 md:px-0">
                    <div>
                        <div className="h-[120px] w-[120px] button-bg rounded-full absolute"></div>
                        <img src={image} alt="" className="w-40 h-40 left-5 top-3 rounded-full object-cover border-t-[5px] border-l-[5px] border-r-[5px] border-[#A5B68D]  relative"/>
                        <p className="relative text-[#A5B68D] font-bold text-3xl -right-35 bottom-0">{name}</p>
                    </div>
                    <div className="md:w-[600px] px-15 md:px-0 relative mx-auto mt-5 md:mt-0">
                        <span className="absolute md:-left-15 left-10 rotate-180"><SiComma /></span>
                        <p className="text-justify">
                           {text} 
                        </p> <span className="absolute md:right-0 right-10 bottom-0"><SiComma /></span>
                    </div>
                </div>
                </div>
    );
};
TestCard.propTypes={
    image: PropTypes.image,
    name: PropTypes.string,
    text: PropTypes.string
}
export default TestCard;