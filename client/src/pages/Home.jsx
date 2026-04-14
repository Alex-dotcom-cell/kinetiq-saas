import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
    const [status, setStatus] = useState("Checking backend...");

    useEffect(() => {
        axios.get("http://localhost:5001/api/hello")
            .then((res) => {
                setStatus(res.data.message);
            })
            .catch(() => {
                setStatus("Backend not connected ❌");
            });
    }, []);

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #000000, #111111)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            fontFamily: "Arial, sans-serif"
        }}>

            {/* TITLE */}
            <h1 style={{
                fontSize: "48px",
                marginBottom: "10px",
                letterSpacing: "2px"
            }}>
                KINETIQ AI FITNESS
            </h1>

            <p style={{
                color: "#aaa",
                marginBottom: "30px"
            }}>
                Premium Personal Trainer Platform
            </p>

            {/* BACKEND STATUS */}
            <div style={{
                padding: "12px 20px",
                background: "#1a1a1a",
                borderRadius: "10px",
                marginBottom: "30px",
                color: status.includes("connected") ? "lime" : "tomato",
                fontWeight: "bold"
            }}>
                {status}
            </div>

            {/* BUTTONS */}
            <div style={{
                display: "flex",
                gap: "20px",
                marginBottom: "40px"
            }}>
                <Link to="/login" style={buttonStyle}>
                    Login
                </Link>

                <Link to="/register" style={buttonStyle}>
                    Register
                </Link>
            </div>

            {/* TEXT */}
            <div style={{
                maxWidth: "700px",
                textAlign: "center",
                color: "#bbb",
                lineHeight: "1.6"
            }}>
                <p>Build your body. Track your progress. Train like an athlete.</p>
                <p>AI-powered fitness system for personal trainers and clients.</p>
            </div>
        </div>
    );
}

const buttonStyle = {
    padding: "12px 24px",
    background: "#ff3b3b",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    transition: "0.3s"
};