import { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import API_URL from "../config";

export default function Login() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);

    const handleAuth = async () => {
        try {
            if (isRegister) {
                await axios.post(`${API_URL}/auth/register`, { name, email, password });
                alert("Registered successfully! Please login.");
                setIsRegister(false);
            } else {
                const res = await axios.post(`${API_URL}/auth/login`, { email, password });
                localStorage.setItem("token", res.data.token);
                window.location.href = "/notes";
            }
        } catch (err) {
            alert(err.response?.data || "Something went wrong");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <h2>{isRegister ? "Register" : "Login"}</h2>

                {isRegister && (
                    <div className="input-group">
                        <FaUser className="icon" />
                        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                )}

                <div className="input-group">
                    <FaEnvelope className="icon" />
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="input-group">
                    <FaLock className="icon" />
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>

                <button className="login-btn" onClick={handleAuth}>
                    {isRegister ? "Register" : "Login"}
                </button>

                <p className="toggle-link">
                    {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                    <span onClick={() => setIsRegister(!isRegister)}>
                        {isRegister ? "Login" : "Register"}
                    </span>
                </p>
            </div>

            <style>{`
        body, html {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          height: 100%;
        }
        .login-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          padding: 10px;
        }
        .login-card {
          background: white;
          padding: 40px 30px;
          border-radius: 15px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          text-align: center;
          box-sizing: border-box;
        }
        .login-card h2 {
          margin-bottom: 30px;
          color: #333;
        }
        .input-group {
          position: relative;
          margin-bottom: 20px;
          width: 100%;
        }
        .input-group .icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #6a11cb;
          font-size: 18px;
        }
        .input-group input {
          width: 100%;
          padding: 12px 12px 12px 42px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 16px;
          box-sizing: border-box;
        }
        .input-group input:focus {
          border-color: #2575fc;
          box-shadow: 0 0 5px rgba(37,117,252,0.5);
          outline: none;
        }
        .login-btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          color: white;
          font-size: 16px;
          cursor: pointer;
          transition: 0.3s ease;
        }
        .login-btn:hover {
          background: linear-gradient(135deg, #2575fc, #6a11cb);
        }
        .toggle-link {
          margin-top: 20px;
          font-size: 14px;
          color: #555;
        }
        .toggle-link span {
          color: #2575fc;
          font-weight: bold;
          cursor: pointer;
        }
        .toggle-link span:hover {
          text-decoration: underline;
        }

        /* Make responsive on small screens */
        @media(max-width: 420px) {
          .login-card {
            padding: 30px 20px;
          }
          .input-group input {
            padding-left: 40px;
          }
        }
      `}</style>
        </div>
    );
}
