import { useState } from "react";
import axios from "axios";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async () => {
        try {
            await axios.post("http://localhost:5000/api/auth/register", {
                name,
                email,
                password,
            });
            window.location.href = "/";
        } catch (err: any) {
            alert(err.response.data);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input placeholder="Name" onChange={e => setName(e.target.value)} />
            <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={register}>Register</button>
            <p>
                Already have an account? <a href="/">Login</a>
            </p>
        </div>
    );
}
