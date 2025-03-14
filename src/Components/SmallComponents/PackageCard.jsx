import PropTypes from "prop-types";
import { FaFeatherPointed } from "react-icons/fa6";
// import { Link } from "react-router-dom";


const PackageCard = ({Menupackage}) => {
    const {name,price,currency,features,validity} = Menupackage;
    return (
        <div className="h-full flex">
            
             <div className="shadow-xl rounded-2xl  text-center space-y-5 ">
                    <div className="button-bg flex items-center justify-center w-full h-12 rounded-t-2xl">
                    <p className=" text-white text-2xl  text-center">{name}</p>
                    </div>
                    
                    <div className="px-20 space-y-3 pb-10 flex flex-col flex-grow">
                    <div className="flex gap-3">
                    <p className="text-2xl py-5 text-gray-400">{price}{currency}/Month</p>
                    <span className="px-4 py-6 text-sm font-medium text-black rounded-full"
                   style={{ background: 'linear-gradient(to bottom, #e7a11f, #ffffff)' }}
                    >{validity}</span>
                    </div>
                   <ul className="text-start space-y-4  pl-5 ">
                   {
                    features?.map((feature,idx)=> <li className="flex gap-1" key={idx}>
                        <span className="prime_color"><FaFeatherPointed /></span>
                        {feature}
                        </li>)
                   }
                   </ul>
                    </div>
                </div>
               
            
        </div>
    );
};

PackageCard.propTypes = {
    Menupackage: PropTypes.object
}
export default PackageCard;