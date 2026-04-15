import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import api from '../../services/api';

const ProgramEditor = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    fetchProgram();
  }, []);

  const fetchProgram = async () => {
    try {
      const response = await api.getProgram();
      const program = response.data || {};
      setFormData({
        title: program.title || '',
        description: program.description || '',
      });
    } catch (error) {
      showMessage('Failed to load program', 'error');
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
    setSaving(true);
    setMessage('');

    try {
      await api.updateProgram(formData);
      showMessage('Program updated successfully', 'success');
    } catch (error) {
      showMessage(error.message || 'Failed to update program', 'error');
    } finally {
      setSaving(false);
    }
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
        <h2 className="text-3xl font-bold text-white mb-8">Edit Weight Loss Program</h2>

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

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Program Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Program title"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded font-medium focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Program Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Program description"
                rows="6"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded font-medium focus:outline-none focus:border-red-600"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-900 text-white font-bold rounded transition"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={fetchProgram}
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded transition"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProgramEditor;
