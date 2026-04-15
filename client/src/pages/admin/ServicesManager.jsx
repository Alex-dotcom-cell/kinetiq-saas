import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import api from '../../services/api';

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.getServices();
      setServices(response.data || []);
    } catch (error) {
      showMessage('Failed to load services', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.updateService(editingId, formData);
        showMessage('Service updated successfully', 'success');
      } else {
        await api.createService(formData);
        showMessage('Service created successfully', 'success');
      }
      resetForm();
      fetchServices();
    } catch (error) {
      showMessage(error.message || 'Operation failed', 'error');
    }
  };

  const handleEdit = (service) => {
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price || '',
    });
    setEditingId(service._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setDeleting(id);
      try {
        await api.deleteService(id);
        showMessage('Service deleted successfully', 'success');
        fetchServices();
      } catch (error) {
        showMessage(error.message || 'Failed to delete service', 'error');
      } finally {
        setDeleting(null);
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', price: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-gray-400">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Services Manager</h2>
          <button
            onClick={() => !showForm ? setShowForm(true) : resetForm()}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition"
          >
            {showForm ? 'Close Form' : '+ Add Service'}
          </button>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded ${
              messageType === 'success'
                ? 'bg-green-900 border border-green-700 text-green-100'
                : 'bg-red-900 border border-red-700 text-red-100'
            }`}
          >
            {message}
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-8 max-w-2xl">
            <h3 className="text-xl font-bold text-white mb-6">
              {editingId ? 'Edit Service' : 'Add New Service'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Service Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Service title"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded font-medium focus:outline-none focus:border-red-600"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Service description"
                  rows="3"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded font-medium focus:outline-none focus:border-red-600"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Price (optional)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded font-medium focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition"
                >
                  {editingId ? 'Update Service' : 'Create Service'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Services List */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800 border-b border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-gray-300 font-bold">Title</th>
                <th className="px-6 py-4 text-left text-gray-300 font-bold">Description</th>
                <th className="px-6 py-4 text-left text-gray-300 font-bold">Price</th>
                <th className="px-6 py-4 text-right text-gray-300 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {services.map((service) => (
                <tr key={service._id} className="hover:bg-gray-800 transition">
                  <td className="px-6 py-4 text-white font-medium">{service.title}</td>
                  <td className="px-6 py-4 text-gray-300 text-sm">{service.description.substring(0, 50)}...</td>
                  <td className="px-6 py-4 text-white">${service.price || '—'}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button
                      onClick={() => handleEdit(service)}
                      className="text-blue-400 hover:text-blue-300 font-medium transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      disabled={deleting === service._id}
                      className="text-red-400 hover:text-red-300 font-medium transition disabled:opacity-50"
                    >
                      {deleting === service._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {services.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            No services yet. Create your first service!
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ServicesManager;
