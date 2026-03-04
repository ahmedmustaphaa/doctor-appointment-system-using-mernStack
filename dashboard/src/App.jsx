import React, { useEffect } from "react";
import { Route, Routes, useNavigate, Outlet } from "react-router-dom";
import Navbar from "./component/Navbar";
import Dashboard from "./Dashboard";
import AddDoctors from "./pages/AddDoctors";
import Appointments from "./pages/Appointments";
import DoctorList from "./pages/DoctorList";
import DashboardPage from "./pages/DashboardPage";
import Login from "./Login";
import { ShareDashData } from "../context/Appcontext";

function App() {
  const { atoken } = ShareDashData();
  const navigate = useNavigate();

  // Redirect تلقائي لو مفيش token
  useEffect(() => {
    if (!atoken) {
      navigate("/login");
    }
  }, [atoken, navigate]);

  return (
    <Routes>
      {/* Login route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Dashboard routes */}
      {atoken && (
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardPage />} />
          <Route path="adddoctor" element={<AddDoctors />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="doctorlist" element={<DoctorList />} />
        </Route>
      )}

      {/* Redirect any unknown routes to /login */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
