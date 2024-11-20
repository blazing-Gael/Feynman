// "use client";

// import { useState } from "react";
// import useAuth from "../../hooks/useAuth";
// import { loginUser } from "../../hooks/useAuth";
// import { useRouter } from "next/navigation";

// export default function Login() {
//     const { login, loading, error } = useAuth();
//     const [formData, setFormData] = useState({ email: "", password: "" });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const { email, password } = formData;
//         try {
//             await login(email, password);
//             alert("Logged in successfully!");
//         } catch (err) {
//             console.error(err.message);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
//             <input name="email" placeholder="Email" type="email" onChange={handleChange} />
//             <input name="password" placeholder="Password" type="password" onChange={handleChange} />
//             <button type="submit" disabled={loading}>
//                 {loading ? "Logging in..." : "Login"}
//             </button>
//             {error && <p className="text-red-500">{error}</p>}
//         </form>
//     );
// }

"use client";
import React, { useState } from "react";
import { loginUser } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginPage({ setShowLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginUser(email, password);
            router.push("/"); // Redirect to the home page or tracker
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center z-50 backdrop-blur-3xl">
            <form onSubmit={handleLogin} className="w-full max-w-md p-6 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-blue-500">Login</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 mb-4 border rounded text-black"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 mb-4 border rounded text-black"
                />
                <button type="submit" className="w-1/2 my-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Login
                </button>
                <button type="button" className="w-full p-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => setShowLogin(false)}>
                    Close
                </button>
            </form>
        </div>
    );
}