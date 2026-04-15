import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import api from '../../services/api';

const ResultsManager = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    beforeImage: '',
    afterImage: '',
    description: '',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await api.getResults();
      setResults(response.data || []);
    } catch (error) {
      showMessage('Failed to load results', 'error');
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
        await api.updateResult(editingId, formData);
        showMessage('Result updated successfully', 'success');
      } else {
        await api.createResult(formData);
        showMessage('Result created successfully', 'success');
      }
      resetForm();
      fetchResults();
    } catch (error) {
      showMessage(error.message || 'Operation failed', 'error');
    }
  };

  const handleEdit = (result) => {
    setFormData({
      beforeImage: result.beforeImage || '',
      afterImage: result.afterImage || '',
      description: result.description || '',
    });
    setEditingId(result._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this result?')) {
      setDeleting(id);
      try {
        await api.deleteResult(id);
        showMessage('Result deleted successfully', 'success');
        fetchResults();
      } catch (error) {
        showMessage(error.message || 'Failed to delete result', 'error');
      } finally {
        setDeleting(null);
      }
    }
  };

  const resetForm = () => {
    setFormData({ beforeImage: '', afterImage: '', description: '' });
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
          <h2 className="text-3xl font-bold text-white">Results Manager</h2>
          <button
            onClick={() => !showForm ? setShowForm(true) : resetForm()}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition"
          >
            {showForm ? 'Close Form' : '+ Add Result'}
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
              {editingId ? 'Edit Result' : 'Add New Result'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Before Image URL
                </label>
                <input
                  type="text"
                  name="beforeImage"
                  value={formData.beforeImage}
                  onChange={handleChange}
                  placeholder="https://example.com/before.jpg"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded font-medium focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  After Image URL
                </label>
                <input
                  type="text"
                  name="afterImage"
                  value={formData.afterImage}
                  onChange={handleChange}
                  placeholder="https://example.com/after.jpg"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded font-medium focus:outline-none focus:border-red-600"
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
                  placeholder="Describe the transformation"
                  rows="3"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded font-medium focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition"
                >
                  {editingId ? 'Update Result' : 'Create Result'}
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

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((result) => (
            <div
              key={result._id}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition"
            >
              <div className="flex gap-4 mb-4">
                {result.beforeImage && (
                  <div>
                    <p className="text-gray-400 text-xs mb-2">Before</p>
                    <img
                      src={result.beforeImage}
                      alt="Before"
                      className="w-20 h-20 rounded object-cover"
                      onError={(e) => (e.target.src = 'https://via.placeholder.com/80')}
                    />
                  </div>
                )}
                {result.afterImage && (
                  <div>
                    <p className="text-gray-400 text-xs mb-2">After</p>
                    <img
                      src={result.afterImage}
                      alt="After"
                      className="w-20 h-20 rounded object-cover"
                      onError={(e) => (e.target.src = 'https://via.placeholder.com/80')}
                    />
                  </div>
                )}
              </div>
              <p className="text-gray-300 mb-4 text-sm">{result.description}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(result)}
                  className="text-blue-400 hover:text-blue-300 font-medium transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(result._id)}
                  disabled={deleting === result._id}
                  className="text-red-400 hover:text-red-300 font-medium transition disabled:opacity-50"
                >
                  {deleting === result._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {results.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            No results yet. Add your first transformation result!
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ResultsManager;
