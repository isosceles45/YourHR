import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/signin`,
                { email, password },
                { withCredentials: true } // This ensures cookies are sent and received
            );
            document.cookie = `access_token=${response.data.access_token}; path=/`;
            console.log(response.data.access_token);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-sm">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-1"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium mb-1"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded w-full"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
