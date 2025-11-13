import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile, } from "firebase/auth";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaUser, FaEnvelope, FaLock, FaImage, FaEye, FaEyeSlash, } from "react-icons/fa";
import { auth, googleProvider } from "../FireBase/FireBase.init";
import Loading from "../Components/Loading";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      validatePasswordInline(value);
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^=&-*]).{6,}$/;
    return regex.test(password);
  };

  const validatePasswordInline = (password) => {
    if (!password) setPasswordError("Password is required.");
    else if (password.length < 6)
      setPasswordError("Password must be at least 6 characters long.");
    else if (!/[A-Z]/.test(password))
      setPasswordError("Include at least one uppercase letter.");
    else if (!/[a-z]/.test(password))
      setPasswordError("Include at least one lowercase letter.");
    else if (!/[!@#$%^&*]/.test(password))
      setPasswordError("Include at least one special character (!@#$%^&*).");
    else setPasswordError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, photoURL } = formData;

    if (!name || !email || !password) {
      toast.error("Please fill all required fields");
      return;
    }
    if (!validatePassword(password)) {
      validatePasswordInline(password);
      toast.error("Please fix the password errors before submitting.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name, photoURL });
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      toast.success(`Welcome, ${result.user.displayName}!`);
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-100 via-white to-green-50 px-4 pt-20">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-green-100 shadow-2xl rounded-2xl p-8 md:p-10 transition-transform hover:scale-[1.02] duration-300">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-700"> Join <span className="text-green-800">EcoTrack</span></h1>
        <form onSubmit={handleRegister} className="space-y-5">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-green-600" />
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-green-600" />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-green-600" />
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${passwordError ? "border-red-400 focus:ring-red-400" : "focus:ring-green-500"}`} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-green-600 hover:text-green-700" tabIndex={-1}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
            {passwordError && (
              <p className="text-red-500 text-sm mt-1 pl-1 animate-fadeIn">{passwordError}</p>
            )}
          </div>

          <div className="relative">
            <FaImage className="absolute left-3 top-3 text-green-600" />
            <input type="text" name="photoURL" placeholder="Photo URL (optional)" value={formData.photoURL} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-linear-to-r from-green-600 to-emerald-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 shadow-md transition duration-200 cursor-pointer">{loading ? <Loading /> : "Create Account"}</button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-300"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="h-px flex-1 bg-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleRegister} disabled={loading} className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition font-medium text-gray-700 cursor-pointer">
          <FcGoogle size={22} />
          {loading ? <Loading /> : "Register with Google"}
        </button>

        <p className="mt-6 text-center text-gray-600 text-sm"> Already have an account?{" "}<Link to="/login" className="text-green-600 font-semibold hover:underline">Login here</Link></p>
      </div>
    </div>
  );
};

export default Register;
