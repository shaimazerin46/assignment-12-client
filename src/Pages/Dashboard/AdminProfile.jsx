import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import useUser from "../../hooks/useUser";
import useMeals from "../../hooks/useMeals";

const AdminProfile = () => {

    const {user} = useContext(AuthContext);
    const [users] = useUser();
    const [meals] = useMeals()
    const isAdmin = users.find(u=>u.email===user.email)
    const filterMeals = meals.filter(meal=>meal?.email===user.email);
    
    
    return (
        <div className="px-2 md:px-0">
            <h3 className="text-xl md:text-center py-10">Admin profile</h3>
            <div className="mx-auto md:w-[300px] space-y-3">
                <img src={isAdmin?.photo} alt=""
                className="w-[100px] h-[100px] rounded-full"
                />
                <h3>Name: {isAdmin?.name}</h3>
                <h3>Email: {isAdmin?.email}</h3>
                <h3>Number of meal added by admin: {filterMeals.length}</h3>
            </div>
        </div>
    );
};

export default AdminProfile;