import axios from "axios";

const axiosPrivate = axios.create({
    baseURL: 'https://y-six-delta.vercel.app/'
})
const useAxiosPrivate = () => {
    return axiosPrivate;
};

export default useAxiosPrivate;