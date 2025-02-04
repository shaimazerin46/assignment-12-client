import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useMeals = () => {
    const axiosPublic = useAxiosPublic()
    const {data: meals=[], error, isLoading } = useQuery({
        queryKey: ['meals'],
        queryFn: async ()=>{
            const res = await axiosPublic.get('/meals')
            return res.data
        }
    })
    return [meals, error, isLoading ]
};

export default useMeals;