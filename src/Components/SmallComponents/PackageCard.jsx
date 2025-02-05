import PropTypes from "prop-types";
// import { Link } from "react-router-dom";


const PackageCard = ({Menupackage}) => {
    const {name,price,currency,features,validity} = Menupackage;
    return (
        <div className="h-full flex">
            
             <div className="border-green-400 rounded-2xl border-[1px] text-center space-y-5 ">
                    <div className="bg-green-400 w-full h-12 rounded-t-2xl">
                    <p className=" text-white text-2xl  text-center">{name}</p>
                    </div>
                    
                    <div className="px-20 space-y-3 pb-10 flex flex-col flex-grow">
                    <div className="flex gap-3">
                    <p className="text-xm text-gray-400">{price}{currency}/Month</p>
                    <span className="px-3 py-1 text-sm font-medium text-white bg-orange-400 rounded-full">{validity}</span>
                    </div>
                   <ul className="text-start space-y-3 list-disc pl-5 ">
                   {
                    features?.map((feature,idx)=> <li key={idx}>{feature}</li>)
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