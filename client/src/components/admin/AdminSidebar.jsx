import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-800';
  };

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen pt-8">
      <nav className="space-y-2 px-4">
        <h2 className="text-gray-400 text-xs font-bold uppercase tracking-wider px-3 mb-4">
          Menu
        </h2>

        <Link
          to="/admin/dashboard"
          className={`block px-4 py-3 rounded font-medium transition ${isActive('/admin/dashboard')}`}
        >
          Dashboard
        </Link>

        <h2 className="text-gray-400 text-xs font-bold uppercase tracking-wider px-3 mb-4 mt-6">
          Content Management
        </h2>

        <Link
          to="/admin/hero"
          className={`block px-4 py-3 rounded font-medium transition ${isActive('/admin/hero')}`}
        >
          Hero Section
        </Link>

        <Link
          to="/admin/about"
          className={`block px-4 py-3 rounded font-medium transition ${isActive('/admin/about')}`}
        >
          About Section
        </Link>

        <Link
          to="/admin/services"
          className={`block px-4 py-3 rounded font-medium transition ${isActive('/admin/services')}`}
        >
          Services
        </Link>

        <Link
          to="/admin/testimonials"
          className={`block px-4 py-3 rounded font-medium transition ${isActive('/admin/testimonials')}`}
        >
          Testimonials
        </Link>

        <Link
          to="/admin/results"
          className={`block px-4 py-3 rounded font-medium transition ${isActive('/admin/results')}`}
        >
          Results
        </Link>

        <Link
          to="/admin/program"
          className={`block px-4 py-3 rounded font-medium transition ${isActive('/admin/program')}`}
        >
          Weight Loss Program
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
