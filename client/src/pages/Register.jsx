import { useState } from "react";
import axios from "axios";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:5000/api/auth/register", {
                email,
                password
            });

            alert("User created!");
        } catch (err) {
            alert("Error registering user");
        }
    };

    return (
        <div style={{ padding: 40 }}>
            <h2>Register</h2>

            <form onSubmit={handleRegister}>
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}