import ReactDOM from "react-dom/client";
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from "./Layout/MainLayout.jsx";
import Home from "./Pages/Home.jsx";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const root = document.getElementById("root");
const queryClient = new QueryClient()

ReactDOM.createRoot(root).render(
  <QueryClientProvider client={queryClient}>
       <BrowserRouter>
    <Routes>
      {/* main layout */}
      <Route path="/" element={<MainLayout></MainLayout>}>
         <Route index element={<Home></Home>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
</QueryClientProvider>

);
