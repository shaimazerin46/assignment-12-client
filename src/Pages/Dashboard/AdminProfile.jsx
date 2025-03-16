import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import useUser from "../../hooks/useUser";
import useMeals from "../../hooks/useMeals";


const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const [users] = useUser();
  const [meals] = useMeals();
  const isAdmin = users?.find((u) => u.email === user?.email);
  const filterMeals = meals?.filter((meal) => meal?.email === user?.email);
  const { name, photo, email, role, badge } = isAdmin || {};

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="relative bg-gradient-to-br from-orange-300 to-orange-500 shadow-2xl rounded-2xl p-8 w-full max-w-md text-center transform transition-all duration-500 hover:scale-105">
        {/* Floating Admin Photo */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <img
            src={photo || "https://via.placeholder.com/150"}
            alt="Admin Avatar"
            className="w-32 h-32 object-cover rounded-full border-4 border-orange-400 shadow-lg"
          />
        </div>

        {/* Admin Details */}
        <h2 className="text-3xl font-bold mt-16 text-gray-800">{name}</h2>
        <p className="text-gray-600 mb-4">{email}</p>

        {/* Role & Badge */}
        <div className="flex justify-center gap-2 mb-4">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-white shadow-md bg-orange-600">
            {role?.toUpperCase() || "ADMIN"}
          </span>
          <span
            className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-white shadow-md"
            style={{ background: "linear-gradient(90deg, #FF4500, #FF8C00)" }}
          >
            {badge || "Top Contributor"}
          </span>
        </div>

        {/* Admin Meal Stats */}
        <h3 className="text-xl font-semibold mb-2 text-white">Meal Overview</h3>
        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
          <div className="bg-white p-3 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-700">Meals Added</h4>
            <p className="text-2xl font-bold text-orange-600">
              {filterMeals?.length || 0}
            </p>
          </div>

          <div className="bg-white p-3 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-700">Total Meals</h4>
            <p className="text-2xl font-bold text-orange-600">
              {meals?.length || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
