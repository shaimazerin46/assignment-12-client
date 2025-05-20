

const TestCard = ({image, name, text}) => {
    return (
         <div>
                    <div className="flex justify-between">
                    <div>
                        <div className="h-[120px] w-[120px] button-bg rounded-full absolute"></div>
                        <img src={image} alt="" className="w-40 h-40 left-5 top-3 rounded-full object-cover border-t-[5px] border-l-[5px] border-r-[5px] border-[#A5B68D]  relative"/>
                        <p className="relative text-[#A5B68D] font-bold text-3xl -right-35 bottom-5">{name}</p>
                    </div>
                    <div className="w-[600px]">
                        <p>
                           {text}
                        </p>
                    </div>
                </div>
                </div>
    );
};

export default TestCard;