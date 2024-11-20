"use client";

import { useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function Register({ setShowRegister }) {
    const { register, loading, error } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, username, email, password } = formData;
        try {
            await register(email, password, name, username);
            alert("User registered successfully!");
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded shadow-md">
                <input name="name" placeholder="Name" className="w-full px-4 py-2 mb-4 border rounded text-black" onChange={handleChange} />
                <input name="username" placeholder="Username" className="w-full px-4 py-2 mb-4 border rounded text-black" onChange={handleChange} />
                <input name="email" placeholder="Email" type="email" className="w-full px-4 py-2 mb-4 border rounded text-black" onChange={handleChange} />
                <input name="password" placeholder="Password" type="password" className="w-full px-4 py-2 mb-4 border rounded text-black" onChange={handleChange} />
                <button type="submit" disabled={loading} className="w-1/2 my-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    {loading ? "Registering..." : "Register"}
                </button>
                <button type="button" className="w-1/2 my-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => setShowRegister(false)}>
                        Close
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    );
}
