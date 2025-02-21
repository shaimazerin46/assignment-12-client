import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";


const useRequestedMeal = () => {
   const axiosPrivate = useAxiosPrivate();
   const {data: requestedMeals=[]} = useQuery({
    queryKey: ['requestedMeals'],
    queryFn: async()=>{
        const res = await axiosPrivate.get('/requestedMeal')
        return res.data
    }
   })
   return [requestedMeals]
};

export default useRequestedMeal;