import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import useUser from "../../hooks/useUser";



const UserProfile = () => {
    const {user} = useContext(AuthContext);
    const [users] = useUser();
    
    const filterdUser = users?.find(u=>u.email===user.email);
   
    return (
        <div className="px-2 md:px-0">
        <h3 className="text-xl md:text-center py-10">User profile</h3>
        <div className="mx-auto md:w-[300px] space-y-3">
            <img src={filterdUser?.photo} alt=""
            className="w-[100px] h-[100px] rounded-full"
            />
            <h3>Name: {filterdUser?.name}</h3>
            <h3>Email: {filterdUser?.email}</h3>
            <h3>Badge: {filterdUser?.badge}</h3>
        </div>
    </div>
    );
};

export default UserProfile;