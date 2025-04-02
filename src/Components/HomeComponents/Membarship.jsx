
import PackageCard from "../SmallComponents/PackageCard";
import { Link } from "react-router-dom";
import usePackage from "../../hooks/usePackage";
import Heading from "../SmallComponents/Heading";


const Membarship = () => {
    const [packages] = usePackage();
    // console.log(packages)
    return (
        <div className="max-w-7xl mx-auto md:mb-20 mb-5">
            <Heading text={"Choose your monthly package"}></Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {
                packages?.map(Menupackage=>(
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