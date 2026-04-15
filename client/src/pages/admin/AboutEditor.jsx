import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import api from '../../services/api';

const AboutEditor = () => {
  const [formData, setFormData] = useState({
    text: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const response = await api.getAbout();
      const about = response.data || {};
      setFormData({
        text: about.text || '',
        image: about.image || '',
      });
    } catch (error) {
      showMessage('Failed to load about section', 'error');
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
      await api.updateAbout(formData);
      showMessage('About section updated successfully', 'success');
    } catch (error) {
      showMessage(error.message || 'Failed to update about section', 'error');
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
        <h2 className="text-3xl font-bold text-white mb-8">Edit About Section</h2>

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
                About Text
              </label>
              <textarea
                name="text"
                value={formData.text}
                onChange={handleChange}
                placeholder="About section text"
                rows="6"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded font-medium focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
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
                onClick={fetchAbout}
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

export default AboutEditor;
