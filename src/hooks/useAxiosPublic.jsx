import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://y-six-delta.vercel.app/"
})
const useAxiosPublic = () => {

    return axiosPublic
};

export default useAxiosPublic;