import { useParams } from "react-router-dom";
import usePackage from "../hooks/usePackage";
import PackageCard from "../Components/SmallComponents/PackageCard";


const PackageDetails = () => {
    const {name} = useParams();
    const [packages] = usePackage();
    const filterPackage = packages?.filter(subPackage=>subPackage.name===name);
    const data = filterPackage[0]
    return (
        <div >
           
            <div className="py-30 mx-auto w-[400px]">
                <PackageCard Menupackage={data}></PackageCard>
                <button className="btn mt-5 mx-auto flex justify-center bg-orange-400 rounded-2xl text-white">Purchases </button>
            </div>
        </div>
    );
};

export default PackageDetails;