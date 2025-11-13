import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useAuth } from "../Provider/AuthContext";
import Spinner from "../Components/Spinner";
import Loading from "../Components/Loading";

const Login = () => {
    const { login, loginWithGoogle } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill in both fields!");
            return;
        }
        setLoading(true);
        try {
            const userCredential = await login(email, password);
            const userInfo = userCredential.user;
            toast.success(`Welcome back, ${userInfo.displayName || userInfo.email}!`);
            navigate(from, { replace: true });
        } catch (err) {
            toast.error(err.message || "Login failed!");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const result = await loginWithGoogle();
            const userInfo = result.user;
            toast.success(`Welcome back, ${userInfo.displayName || userInfo.email}!`);
            navigate(from, { replace: true });
        } catch (err) {
            toast.error(err.message || "Google login failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-green-50 via-white to-green-100 px-4">
            <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 transform transition duration-300 hover:scale-[1.01]">
                <h1 className="text-3xl font-extrabold text-center text-green-700 mb-6"> Welcome Back to <span className="text-green-600">EcoTrack</span></h1>
                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block mb-1 text-gray-700 font-semibold">Email</label>
                        <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-700 font-semibold">Password</label>
                        <input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition transform hover:scale-[1.01]">{loading ? <Loading /> : "Login"}</button>
                </form>

                <div className="my-4 flex items-center justify-center text-gray-500">
                    <span className="border-t w-1/5 border-gray-300"></span>
                    <span className="mx-2 text-sm">or</span>
                    <span className="border-t w-1/5 border-gray-300"></span>
                </div>
                <button onClick={handleGoogleLogin} disabled={loading} className="w-full flex items-center justify-center gap-2 border py-2 rounded-md hover:bg-gray-100 transition font-semibold"><FcGoogle size={22} /> {loading ? ` ${<Loading/>} Loading...` : "Login with Google"}</button>
                <p className="mt-6 text-center text-gray-700 text-sm">Don’t have an account?{" "}<Link to="/register" className="text-green-600 font-semibold hover:underline">Register</Link></p>
                <p className="text-center mt-2"><Link to="/forgot-password" className="text-gray-500 text-xs hover:underline">Forgot Password?</Link></p>
            </div>
        </div>
    );
};

export default Login;