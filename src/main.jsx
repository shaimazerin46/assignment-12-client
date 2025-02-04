import ReactDOM from "react-dom/client";
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from "./Layout/MainLayout.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      {/* main layout */}
      <Route path="/" element={<MainLayout></MainLayout>} />
    </Routes>
  </BrowserRouter>
);
