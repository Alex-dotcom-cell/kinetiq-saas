import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import api from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    services: 0,
    testimonials: 0,
    results: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [servicesRes, testimonialsRes, resultsRes] = await Promise.all([
          api.getServices(),
          api.getTestimonials(),
          api.getResults(),
        ]);

        setStats({
          services: servicesRes.data?.length || 0,
          testimonials: testimonialsRes.data?.length || 0,
          results: resultsRes.data?.length || 0,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const quickLinks = [
    { title: 'Edit Hero Section', path: '/admin/hero', icon: '🎯' },
    { title: 'Edit About Section', path: '/admin/about', icon: '👤' },
    { title: 'Manage Services', path: '/admin/services', icon: '⚙️' },
    { title: 'Manage Testimonials', path: '/admin/testimonials', icon: '💬' },
    { title: 'Manage Results', path: '/admin/results', icon: '📊' },
    { title: 'Edit Weight Loss Program', path: '/admin/program', icon: '🏋️' },
  ];

  return (
    <AdminLayout>
      <div>
        <h2 className="text-3xl font-bold text-white mb-8">Dashboard</h2>

        {loading ? (
          <div className="text-gray-400">Loading...</div>
        ) : (
          <>
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Total Services</p>
                <p className="text-4xl font-bold text-white">{stats.services}</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Total Testimonials</p>
                <p className="text-4xl font-bold text-white">{stats.testimonials}</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Total Results</p>
                <p className="text-4xl font-bold text-white">{stats.results}</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Quick Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="bg-gray-900 border border-gray-800 hover:border-red-600 rounded-lg p-6 transition group"
                  >
                    <div className="text-4xl mb-3 group-hover:scale-110 transition">{link.icon}</div>
                    <h4 className="text-white font-bold group-hover:text-red-400 transition">
                      {link.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
