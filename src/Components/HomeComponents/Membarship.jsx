import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PackageCard from "../SmallComponents/PackageCard";


const Membarship = () => {
    const [packages,setPackages] = useState([]);
    const axiosPublic = useAxiosPublic();
    useEffect(()=>{
        axiosPublic.get('/packages')
        .then(res=>{
            setPackages(res.data);

        })
    },[axiosPublic])
    return (
        <div className="mb-20">
            <h3 className="text-2xl text-center text-orange-400 pb-20">--Choose your monthly package--</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {
                packages.map(Menupackage=><PackageCard key={Menupackage._id} Menupackage={Menupackage}></PackageCard>)
              }
            </div>
        </div>
    );
};

export default Membarship;