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
      </Route>
    </Routes>
  </BrowserRouter>
</QueryClientProvider>
  </AuthProvider>

);
