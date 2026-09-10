import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MenuDetails from "./pages/MenuDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import MenuManagement from "./pages/MenuManagement";
import MenuForm from "./pages/MenuForm";
import Users from "./pages/Users";

function ProtectedAdmin({ children }) {
  const { user } = useAuth();
  return user?.role === "Admin" ? children : <Navigate to="/admin/login" replace />;
}

function AppRoutes() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu/:id" element={<MenuDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedAdmin><Dashboard /></ProtectedAdmin>} />
          <Route path="/admin/menu" element={<ProtectedAdmin><MenuManagement /></ProtectedAdmin>} />
          <Route path="/admin/menu/add" element={<ProtectedAdmin><MenuForm /></ProtectedAdmin>} />
          <Route path="/admin/menu/edit/:id" element={<ProtectedAdmin><MenuForm /></ProtectedAdmin>} />
          <Route path="/admin/users" element={<ProtectedAdmin><Users /></ProtectedAdmin>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
