import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import api from '../../services/api';

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    text: '',
    rating: '5',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await api.getTestimonials();
      setTestimonials(response.data || []);
    } catch (error) {
      showMessage('Failed to load testimonials', 'error');
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
        await api.updateTestimonial(editingId, {
          ...formData,
          rating: parseInt(formData.rating),
        });
        showMessage('Testimonial updated successfully', 'success');
      } else {
        await api.createTestimonial({
          ...formData,
          rating: parseInt(formData.rating),
        });
        showMessage('Testimonial created successfully', 'success');
      }
      resetForm();
      fetchTestimonials();
    } catch (error) {
      showMessage(error.message || 'Operation failed', 'error');
    }
  };

  const handleEdit = (testimonial) => {
    setFormData({
      name: testimonial.name,
      text: testimonial.text,
      rating: String(testimonial.rating),
    });
    setEditingId(testimonial._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      setDeleting(id);
      try {
        await api.deleteTestimonial(id);
        showMessage('Testimonial deleted successfully', 'success');
        fetchTestimonials();
      } catch (error) {
        showMessage(error.message || 'Failed to delete testimonial', 'error');
      } finally {
        setDeleting(null);
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', text: '', rating: '5' });
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

  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
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
          <h2 className="text-3xl font-bold text-white">Testimonials Manager</h2>
          <button
            onClick={() => !showForm ? setShowForm(true) : resetForm()}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition"
          >
            {showForm ? 'Close Form' : '+ Add Testimonial'}
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
              {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Client Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Client name"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded font-medium focus:outline-none focus:border-red-600"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Testimonial Text
                </label>
                <textarea
                  name="text"
                  value={formData.text}
                  onChange={handleChange}
                  placeholder="What did the client say?"
                  rows="4"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded font-medium focus:outline-none focus:border-red-600"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Rating
                </label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded font-medium focus:outline-none focus:border-red-600"
                >
                  <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                  <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                  <option value="3">⭐⭐⭐ (3 Stars)</option>
                  <option value="2">⭐⭐ (2 Stars)</option>
                  <option value="1">⭐ (1 Star)</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition"
                >
                  {editingId ? 'Update Testimonial' : 'Create Testimonial'}
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

        {/* Testimonials List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-white font-bold text-lg">{testimonial.name}</h3>
                <span className="text-yellow-400">{renderStars(testimonial.rating)}</span>
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">{testimonial.text}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(testimonial)}
                  className="text-blue-400 hover:text-blue-300 font-medium transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(testimonial._id)}
                  disabled={deleting === testimonial._id}
                  className="text-red-400 hover:text-red-300 font-medium transition disabled:opacity-50"
                >
                  {deleting === testimonial._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {testimonials.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            No testimonials yet. Add your first testimonial!
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default TestimonialsManager;
