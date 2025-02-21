import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";


const useUser = () => {
   const axiosPrivate = useAxiosPrivate();
   const {data: users=[]} = useQuery({
    queryKey: ['users'],
    queryFn: async ()=>{
        const res = await axiosPrivate.get('/users');
        return res.data;
    }
   })
   return [users]
};

export default useUser;