import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

export default function Home() {
    const [hero, setHero] = useState({});
    const [about, setAbout] = useState({});
    const [services, setServices] = useState([]);
    const [program, setProgram] = useState({});
    const [testimonials, setTestimonials] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user, isAdmin } = useAuth();

    useEffect(() => {
        loadContent();
    }, []);

    const loadContent = async () => {
        try {
            setLoading(true);
            const [heroResponse, aboutResponse, servicesResponse, programResponse, testimonialsResponse, resultsResponse] = await Promise.all([
                api.getHero(),
                api.getAbout(),
                api.getServices(),
                api.getProgram(),
                api.getTestimonials(),
                api.getResults()
            ]);

            setHero(heroResponse?.data || {});
            setAbout(aboutResponse?.data || {});
            setServices(servicesResponse?.data || []);
            setProgram(programResponse?.data || {});
            setTestimonials(testimonialsResponse?.data || []);
            setResults(resultsResponse?.data || []);
        } catch (err) {
            console.error('Failed to load content:', err);
            setError(err.message || 'Failed to load content');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #000000, #111111)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px"
            }}>
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #000000, #111111)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px"
            }}>
                {error}
            </div>
        );
    }

    return (
        <div style={{ background: "#000", color: "#fff", minHeight: "100vh" }}>
            {/* Navigation */}
            <nav style={{
                position: "fixed",
                top: 0,
                width: "100%",
                background: "rgba(0, 0, 0, 0.9)",
                backdropFilter: "blur(10px)",
                zIndex: 1000,
                padding: "1rem 0"
            }}>
                <div style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <h1 style={{ color: "#ff3b3b", margin: 0 }}>FITNESS PRO</h1>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                        <a href="#hero" style={{ color: "#fff", textDecoration: "none" }}>Home</a>
                        <a href="#about" style={{ color: "#fff", textDecoration: "none" }}>About</a>
                        <a href="#services" style={{ color: "#fff", textDecoration: "none" }}>Services</a>
                        <a href="#program" style={{ color: "#fff", textDecoration: "none" }}>Program</a>
                        <a href="#results" style={{ color: "#fff", textDecoration: "none" }}>Results</a>
                        <a href="#testimonials" style={{ color: "#fff", textDecoration: "none" }}>Testimonials</a>
                        {isAdmin && <Link to="/admin/login" style={{ color: "#ff3b3b", textDecoration: "none" }}>Admin</Link>}
                        {user ? (
                            <Link to="/login" style={{ background: "#ff3b3b", color: "white", textDecoration: "none", padding: "0.5rem 1rem", borderRadius: "5px" }}>Logout</Link>
                        ) : (
                            <Link to="/login" style={{ background: "#ff3b3b", color: "white", textDecoration: "none", padding: "0.5rem 1rem", borderRadius: "5px" }}>Login</Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="hero" style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #000000, #111111)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "120px 20px 80px",
                textAlign: "center"
            }}>
                <div>
                    <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#fff" }}>
                        {hero.title || "KINETIQ PERSONAL TRAINING"}
                    </h1>
                    <p style={{ fontSize: "1.2rem", color: "#aaa", marginBottom: "2rem" }}>
                        {hero.subtitle || "Premium Personal Trainer with 20+ Years of Experience"}
                    </p>
                    <p style={{ color: "#bbb", marginBottom: "2rem" }}>
                        {hero.description || "Build your body. Track your progress. Train like an athlete."}
                    </p>
                    <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                        <a href="#services" style={{ background: "#ff3b3b", color: "white", textDecoration: "none", padding: "1rem 2rem", borderRadius: "5px" }}>
                            {hero.ctaText || "Book Now"}
                        </a>
                    </div>
                    {hero.image && (
                        <div style={{ marginTop: "2rem" }}>
                            <img
                                src={hero.image}
                                alt={hero.title || 'Hero Image'}
                                style={{ width: "100%", maxWidth: "600px", borderRadius: "15px", objectFit: "cover" }}
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400'; }}
                            />
                        </div>
                    )}
                </div>
            </section>

            {/* About Section */}
            <section id="about" style={{
                padding: "80px 20px",
                background: "#111",
                textAlign: "center"
            }}>
                <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem", color: "#ff3b3b" }}>
                    About Me
                </h2>
                <p style={{ maxWidth: "800px", margin: "0 auto", color: "#bbb", lineHeight: "1.6" }}>
                    {about.text || "As a dedicated gym trainer with over two decades of experience..."}
                </p>
                {about.experience && (
                    <p style={{ color: "#ff3b3b", fontSize: "1.2rem", margin: "2rem 0" }}>
                        {about.experience}
                    </p>
                )}
                {about.stats && about.stats.length > 0 && (
                    <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "2rem" }}>
                        {about.stats.map((stat, index) => (
                            <div key={index} style={{ textAlign: "center" }}>
                                <h3 style={{ color: "#ff3b3b", fontSize: "2rem" }}>{stat.value}</h3>
                                <p style={{ color: "#aaa" }}>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Services Section */}
            <section id="services" style={{
                padding: "80px 20px",
                background: "#000",
                textAlign: "center"
            }}>
                <h2 style={{ fontSize: "2.5rem", marginBottom: "3rem", color: "#fff" }}>My Services</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
                    {services.length > 0 ? services.map((service) => (
                        <div key={service._id} style={{
                            background: "#1a1a1a",
                            padding: "2rem",
                            borderRadius: "10px",
                            textAlign: "center"
                        }}>
                            <h3 style={{ color: "#ff3b3b", marginBottom: "1rem" }}>{service.title}</h3>
                            <p style={{ color: "#bbb", marginBottom: "1rem" }}>{service.description}</p>
                            {service.price !== undefined && service.price !== null && (
                                <p style={{ color: "#fff", fontWeight: 700 }}>${service.price.toFixed(2)}</p>
                            )}
                        </div>
                    )) : (
                        <div style={{ color: "#aaa", gridColumn: "1 / -1" }}>No services available yet.</div>
                    )}
                </div>
            </section>

            {/* Program Section */}
            <section id="program" style={{
                padding: "80px 20px",
                background: "#111",
                textAlign: "center"
            }}>
                <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem", color: "#ff3b3b" }}>
                    {program.title || "Weight Loss Program"}
                </h2>
                <p style={{ maxWidth: "800px", margin: "0 auto", color: "#bbb", lineHeight: "1.6" }}>
                    {program.description || "Our proven weight loss program..."}
                </p>
                {program.stats && program.stats.length > 0 && (
                    <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "3rem" }}>
                        {program.stats.map((result, index) => (
                            <div key={index} style={{ textAlign: "center" }}>
                                <h3 style={{ color: "#ff3b3b", fontSize: "2rem" }}>{result.value}</h3>
                                <p style={{ color: "#aaa" }}>{result.label}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Results Section */}
            <section id="results" style={{
                padding: "80px 20px",
                background: "#000",
                textAlign: "center"
            }}>
                <h2 style={{ fontSize: "2.5rem", marginBottom: "3rem", color: "#fff" }}>Client Results</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
                    {results.length > 0 ? results.map((result) => (
                        <div key={result._id} style={{
                            background: "#1a1a1a",
                            padding: "2rem",
                            borderRadius: "10px",
                            textAlign: "center"
                        }}>
                            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                                {result.beforeImage && (
                                    <img
                                        src={result.beforeImage}
                                        alt="Before"
                                        style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "10px" }}
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/120'; }}
                                    />
                                )}
                                {result.afterImage && (
                                    <img
                                        src={result.afterImage}
                                        alt="After"
                                        style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "10px" }}
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/120'; }}
                                    />
                                )}
                            </div>
                            <p style={{ color: "#bbb" }}>{result.description || 'Transformation details will be available soon.'}</p>
                        </div>
                    )) : (
                        <div style={{ color: "#aaa", gridColumn: "1 / -1" }}>No client results available yet.</div>
                    )}
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" style={{
                padding: "80px 20px",
                background: "#111",
                textAlign: "center"
            }}>
                <h2 style={{ fontSize: "2.5rem", marginBottom: "3rem", color: "#fff" }}>What My Clients Say</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
                    {testimonials.length > 0 ? testimonials.map((testimonial) => (
                        <div key={testimonial._id} style={{
                            background: "#1a1a1a",
                            padding: "2rem",
                            borderRadius: "10px"
                        }}>
                            <p style={{ color: "#bbb", fontStyle: "italic", marginBottom: "1rem" }}>
                                "{testimonial.text}"
                            </p>
                            <h4 style={{ color: "#ff3b3b" }}>{testimonial.name}</h4>
                            <p style={{ color: "#aaa", marginTop: "0.5rem" }}>
                                {Array.from({ length: testimonial.rating || 5 }, (_, index) => (
                                    <span key={index} style={{ color: "#ff3b3b", marginRight: "0.1rem" }}>★</span>
                                ))}
                            </p>
                        </div>
                    )) : (
                        <div style={{ color: "#aaa", gridColumn: "1 / -1" }}>No testimonials available yet.</div>
                    )}
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" style={{
                padding: "80px 20px",
                background: "#000",
                textAlign: "center"
            }}>
                <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem", color: "#ff3b3b" }}>Contact Me</h2>
                <p style={{ color: "#bbb", marginBottom: "2rem" }}>Ready to start your fitness journey?</p>
                <a href="mailto:trainer@fitnesspro.com" style={{
                    background: "#ff3b3b",
                    color: "white",
                    textDecoration: "none",
                    padding: "1rem 2rem",
                    borderRadius: "5px",
                    fontSize: "1.1rem"
                }}>
                    Get In Touch
                </a>
            </section>

            {/* Footer */}
            <footer style={{
                background: "#000",
                padding: "2rem 20px",
                textAlign: "center",
                color: "#666"
            }}>
                <p>&copy; 2024 Fitness Pro. All rights reserved.</p>
            </footer>
        </div>
    );
}