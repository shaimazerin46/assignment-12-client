
import PackageCard from "../SmallComponents/PackageCard";
import { Link } from "react-router-dom";
import usePackage from "../../hooks/usePackage";


const Membarship = () => {
    const [packages] = usePackage();
    console.log(packages)
    return (
        <div className="mb-20">
            <h3 className="text-2xl text-center text-orange-400 pb-20">--Choose your monthly package--</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {
                packages.map(Menupackage=>(
                <Link to={`/checkout/${Menupackage.name}`} key={Menupackage._id}>
                <PackageCard  Menupackage={Menupackage}></PackageCard>
                </Link>
                ))
               
              }
            </div>
        </div>
    );
};

export default Membarship;