import { useState } from "react";
import axios from "axios";
import API_URL from "../config";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async () => {
        try {
            await axios.post(`${API_URL}/auth/register`, {
                name,
                email,
                password,
            });
            window.location.href = "/";
        } catch (err: any) {
            alert(err.response?.data || "Something went wrong");
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <input
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={register}>Register</button>
            <p>
                Already have an account? <a href="/">Login</a>
            </p>
        </div>
    );
}
