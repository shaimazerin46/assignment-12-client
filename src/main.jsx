import ReactDOM from "react-dom/client";
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from "./Layout/MainLayout.jsx";
import Home from "./Pages/Home.jsx";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import MealsDetails from "./Pages/MealsDetails.jsx";
import Register from "./Pages/Register.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import Login from "./Pages/Login.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import PackageDetails from "./Pages/PackageDetails.jsx";
import AllMeal from "./Pages/AllMeal.jsx";
import UpcomingMeals from "./Pages/UpcomingMeals.jsx";
import DashboardLayout from "./Layout/DashboardLayout.jsx";
import AddMeal from "./Pages/Dashboard/AddMeal.jsx";
import AllUsers from "./Pages/Dashboard/AllUsers.jsx";
import AdminProfile from "./Pages/Dashboard/AdminProfile.jsx";
import Allmeal from "./Pages/Dashboard/Allmeal.jsx";
import UpdateMeal from "./Pages/Dashboard/UpdateMeal.jsx";
import AllReview from "./Pages/Dashboard/AllReview.jsx";
import ServedMeal from "./Pages/Dashboard/ServedMeal.jsx";


const root = document.getElementById("root");
const queryClient = new QueryClient()

ReactDOM.createRoot(root).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
       <BrowserRouter>
    <Routes>
      {/* main layout */}
      <Route path="/" element={<MainLayout></MainLayout>}>
         <Route index element={<Home></Home>}></Route>
         <Route path="/meals/:id" element={<MealsDetails></MealsDetails>}></Route>
         <Route path="/register" element={<Register></Register>}></Route>
         <Route path="/login" element={<Login></Login>}></Route>
         <Route path="/checkout/:name" element={<PrivateRoute><PackageDetails></PackageDetails></PrivateRoute>}></Route>
         <Route path="/allMeal" element={<AllMeal></AllMeal>}></Route>
         <Route path="/upcomingMeals" element={<UpcomingMeals></UpcomingMeals>}></Route>
      </Route>
      <Route path="/dashboard" element={<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>}>
      <Route index element={<PrivateRoute><AdminProfile></AdminProfile></PrivateRoute>}></Route>
      <Route path="/dashboard/addMeal" element={<PrivateRoute><AddMeal /></PrivateRoute>} />
      <Route path="/dashboard/allUser" element={<PrivateRoute><AllUsers></AllUsers></PrivateRoute>}></Route>
      <Route path='/dashboard/allMeals' element={<PrivateRoute><Allmeal></Allmeal></PrivateRoute>}></Route>
      <Route path="/dashboard/updateMeal/:id" element={<PrivateRoute><UpdateMeal></UpdateMeal></PrivateRoute>}></Route>
      <Route path='/dashboard/allReview' element={<PrivateRoute><AllReview></AllReview></PrivateRoute>}></Route>
      <Route path="/dashboard/servedMeal" element={<PrivateRoute><ServedMeal></ServedMeal></PrivateRoute>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
</QueryClientProvider>
  </AuthProvider>

);
