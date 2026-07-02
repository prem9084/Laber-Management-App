import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

import Home from "./components/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import Login from "./components/AuthPage/Login";
import Register from "./components/AuthPage/Register";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import ProtectedRoute from "./components/Routes/ProjectedRoute";
import ProfilePage from "./components/Profile/ProfilePage";
import UsersPage from "./components/Pages/AllUsers";
import AttendancePage from "./components/Pages/AttendencePage";
import AttendancePages from "./components/LaberPages/AttendencePage";
import ExpensePage from "./components/Pages/UserExpences";
import ExpensePages from "./components/LaberPages/ExpensePage";
import SitePage from "./components/Pages/AddSiteName";
import UserProtectedRoute from "./components/Routes/UserProtectedRoute";
import FinalLaberSheet from "./components/FinalSeet/FinalLaberSheet";
import PrintLaberSheet from "./components/FinalSeet/PrintLaberSheet";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin */}
        <Route path="/thekedar" element={<ProtectedRoute />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="attendence" element={<AttendancePage />} />
          <Route path="expence" element={<ExpensePage />} />
          <Route path="site_name" element={<SitePage />} />
          <Route path="final_sheet" element={<FinalLaberSheet />} />
          <Route path="laber-sheet" element={<PrintLaberSheet />} />
        </Route>

        {/* User */}
        <Route path="/laber" element={<UserProtectedRoute />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="myattendence" element={<AttendancePages />} />
          <Route path="myexpence" element={<ExpensePages />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
