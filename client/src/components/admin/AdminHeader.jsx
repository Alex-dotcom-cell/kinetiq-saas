import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 shadow">
      <div className="px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Kinetiq Admin</h1>
        
        <div className="flex items-center gap-4">
          {user && (
            <>
              <div className="text-right">
                <p className="text-white text-sm font-medium">{user.name}</p>
                <p className="text-gray-400 text-xs">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
