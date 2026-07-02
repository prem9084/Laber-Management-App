import { Navigate, Outlet } from "react-router-dom";

const UserProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "0") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default UserProtectedRoute;