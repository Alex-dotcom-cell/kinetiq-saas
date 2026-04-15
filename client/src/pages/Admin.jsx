import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import api from "../services/api";

// Admin Dashboard Component
function AdminDashboard() {
    return (
        <div style={{ padding: "2rem" }}>
            <h2>Admin Dashboard</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginTop: "2rem" }}>
                <Link to="/admin/content" style={cardStyle}>
                    <h3>Content Management</h3>
                    <p>Manage website content</p>
                </Link>
                <Link to="/admin/users" style={cardStyle}>
                    <h3>User Management</h3>
                    <p>Manage users and roles</p>
                </Link>
                <Link to="/admin/services" style={cardStyle}>
                    <h3>Services</h3>
                    <p>Manage service offerings</p>
                </Link>
                <Link to="/admin/testimonials" style={cardStyle}>
                    <h3>Testimonials</h3>
                    <p>Manage client testimonials</p>
                </Link>
            </div>
        </div>
    );
}

// Content Management Component
function ContentManagement() {
    const [activeTab, setActiveTab] = useState('hero');

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Content Management</h2>
            <div style={{ marginTop: "2rem" }}>
                <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
                    {['hero', 'about', 'program'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: "0.5rem 1rem",
                                background: activeTab === tab ? "#ff3b3b" : "#333",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {activeTab === 'hero' && <HeroEditor />}
                {activeTab === 'about' && <AboutEditor />}
                {activeTab === 'program' && <ProgramEditor />}
            </div>
        </div>
    );
}

// Hero Editor Component
function HeroEditor() {
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        description: '',
        ctaText: '',
        ctaLink: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.updateHero(formData);
            setMessage('Hero content updated successfully!');
        } catch (error) {
            setMessage('Failed to update hero content');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
            <h3>Edit Hero Section</h3>
            <div style={{ marginBottom: "1rem" }}>
                <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    style={inputStyle}
                    required
                />
            </div>
            <div style={{ marginBottom: "1rem" }}>
                <input
                    type="text"
                    placeholder="Subtitle"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                    style={inputStyle}
                />
            </div>
            <div style={{ marginBottom: "1rem" }}>
                <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    style={{...inputStyle, minHeight: "100px"}}
                />
            </div>
            <div style={{ marginBottom: "1rem" }}>
                <input
                    type="text"
                    placeholder="CTA Text"
                    value={formData.ctaText}
                    onChange={(e) => setFormData({...formData, ctaText: e.target.value})}
                    style={inputStyle}
                />
            </div>
            <button type="submit" disabled={loading} style={buttonStyle}>
                {loading ? 'Saving...' : 'Save Changes'}
            </button>
            {message && <p style={{ marginTop: "1rem", color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
        </form>
    );
}

// About Editor Component
function AboutEditor() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        experience: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.updateAbout(formData);
            setMessage('About content updated successfully!');
        } catch (error) {
            setMessage('Failed to update about content');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
            <h3>Edit About Section</h3>
            <div style={{ marginBottom: "1rem" }}>
                <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    style={inputStyle}
                    required
                />
            </div>
            <div style={{ marginBottom: "1rem" }}>
                <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    style={{...inputStyle, minHeight: "150px"}}
                    required
                />
            </div>
            <div style={{ marginBottom: "1rem" }}>
                <input
                    type="text"
                    placeholder="Experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    style={inputStyle}
                />
            </div>
            <button type="submit" disabled={loading} style={buttonStyle}>
                {loading ? 'Saving...' : 'Save Changes'}
            </button>
            {message && <p style={{ marginTop: "1rem", color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
        </form>
    );
}

// Program Editor Component
function ProgramEditor() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.updateProgram(formData);
            setMessage('Program content updated successfully!');
        } catch (error) {
            setMessage('Failed to update program content');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
            <h3>Edit Weight Loss Program</h3>
            <div style={{ marginBottom: "1rem" }}>
                <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    style={inputStyle}
                    required
                />
            </div>
            <div style={{ marginBottom: "1rem" }}>
                <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    style={{...inputStyle, minHeight: "150px"}}
                    required
                />
            </div>
            <div style={{ marginBottom: "1rem" }}>
                <input
                    type="text"
                    placeholder="Duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    style={inputStyle}
                />
            </div>
            <button type="submit" disabled={loading} style={buttonStyle}>
                {loading ? 'Saving...' : 'Save Changes'}
            </button>
            {message && <p style={{ marginTop: "1rem", color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
        </form>
    );
}

// Main Admin Component
export default function Admin() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div style={{ background: "#111", color: "#fff", minHeight: "100vh" }}>
            <nav style={{
                background: "#000",
                padding: "1rem 2rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <h1 style={{ color: "#ff3b3b", margin: 0 }}>Admin Panel</h1>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>← Back to Site</Link>
                    <button onClick={handleLogout} style={{ background: "#ff3b3b", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "5px", cursor: "pointer" }}>
                        Logout
                    </button>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/content" element={<ProtectedRoute adminOnly={true}><ContentManagement /></ProtectedRoute>} />
                <Route path="/users" element={<ProtectedRoute adminOnly={true}><div style={{ padding: "2rem" }}><h2>User Management</h2><p>Coming soon...</p></div></ProtectedRoute>} />
                <Route path="/services" element={<ProtectedRoute adminOnly={true}><div style={{ padding: "2rem" }}><h2>Services Management</h2><p>Coming soon...</p></div></ProtectedRoute>} />
                <Route path="/testimonials" element={<ProtectedRoute adminOnly={true}><div style={{ padding: "2rem" }}><h2>Testimonials Management</h2><p>Coming soon...</p></div></ProtectedRoute>} />
            </Routes>
        </div>
    );
}

const cardStyle = {
    background: "#1a1a1a",
    padding: "1.5rem",
    borderRadius: "10px",
    textDecoration: "none",
    color: "#fff",
    display: "block",
    transition: "transform 0.3s ease",
    cursor: "pointer"
};

const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    background: "#2a2a2a",
    border: "1px solid #444",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "1rem"
};

const buttonStyle = {
    background: "#ff3b3b",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem"
};