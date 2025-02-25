import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";


const useUser = () => {
   const axiosPrivate = useAxiosPrivate();
   const {data: users=[],refetch} = useQuery({
    queryKey: ['users'],
    queryFn: async ()=>{
        const res = await axiosPrivate.get('/users');
        return res.data;
    }
   })
   return [users,refetch]
};

export default useUser;