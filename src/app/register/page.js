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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 z-50">
    <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create an Account</h2>
        
        <input 
            name="name" 
            placeholder="Name" 
            className="w-full px-4 py-3 mb-4 border rounded-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-400 transition-all duration-300" 
            onChange={handleChange} 
        />
        
        <input 
            name="username" 
            placeholder="Username" 
            className="w-full px-4 py-3 mb-4 border rounded-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-400 transition-all duration-300" 
            onChange={handleChange} 
        />
        
        <input 
            name="email" 
            placeholder="Email" 
            type="email" 
            className="w-full px-4 py-3 mb-4 border rounded-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-400 transition-all duration-300" 
            onChange={handleChange} 
        />
        
        <input 
            name="password" 
            placeholder="Password" 
            type="password" 
            className="w-full px-4 py-3 mb-6 border rounded-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-400 transition-all duration-300" 
            onChange={handleChange} 
        />

        <button 
            type="submit" 
            disabled={loading} 
            className="w-full my-4 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300 disabled:bg-gray-400">
            {loading ? "Registering..." : "Register"}
        </button>

        <button 
            type="button" 
            className="w-full my-4 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition-all duration-300" 
            onClick={() => setShowRegister(false)}>
            Close
        </button>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </form>
</div>

    );
}
