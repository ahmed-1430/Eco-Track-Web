import React, { useState } from "react";
import { Link } from "react-router";
import { FaEnvelope, FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import Loading from "../Components/Loading";

const Reset = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    // (Future: integrate Firebase sendPasswordResetEmail)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            alert("Please enter your email address");
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert(`Password reset link sent to ${email} (demo only)`);
        }, 1200);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 via-white to-green-100 px-4">
            <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 md:p-10 border border-green-100 transition-transform hover:scale-[1.02] duration-300">

                <h1 className="text-3xl font-bold text-center text-green-700 mb-2"> Reset Password</h1>
                <p className="text-center text-gray-600 mb-6 text-sm"> Enter your email to receive a password reset link.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-3.5 text-green-600" />
                        <input type="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition text-gray-700" />
                    </div>

                    <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-green-600 to-emerald-500 text-white py-2.5 rounded-lg font-semibold hover:opacity-90 shadow-md transition duration-200">
                        {loading ? (
                            <Loading />
                        ) : (
                            <>
                                <FaPaperPlane />
                                <span>Send Reset Link</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 flex items-center justify-between text-sm">
                    <Link to="/login" className="text-green-600 hover:underline flex items-center gap-1"><FaArrowLeft /> Back to Login</Link>
                    <Link to="/register" className="text-green-600 hover:underline font-medium">Create Account</Link>
                </div>
            </div>
        </div>
    );
};

export default Reset;
