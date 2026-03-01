import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import MainLayout from "./component/MainLayout";
import Home from "./component/Home";
import Login from "./component/login";
import Register from "./component/register";
import Consultation from "./pages/Consultation";
import BloodRequest from "./pages/BloodRequest";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/blood-request" element={<BloodRequest />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);