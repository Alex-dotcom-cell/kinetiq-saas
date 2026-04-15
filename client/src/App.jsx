import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HeroEditor from "./pages/admin/HeroEditor";
import AboutEditor from "./pages/admin/AboutEditor";
import ServicesManager from "./pages/admin/ServicesManager";
import TestimonialsManager from "./pages/admin/TestimonialsManager";
import ResultsManager from "./pages/admin/ResultsManager";
import ProgramEditor from "./pages/admin/ProgramEditor";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/hero"
        element={
          <ProtectedAdminRoute>
            <HeroEditor />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/about"
        element={
          <ProtectedAdminRoute>
            <AboutEditor />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/services"
        element={
          <ProtectedAdminRoute>
            <ServicesManager />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/testimonials"
        element={
          <ProtectedAdminRoute>
            <TestimonialsManager />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/results"
        element={
          <ProtectedAdminRoute>
            <ResultsManager />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/program"
        element={
          <ProtectedAdminRoute>
            <ProgramEditor />
          </ProtectedAdminRoute>
        }
      />
    </Routes>
  );
}