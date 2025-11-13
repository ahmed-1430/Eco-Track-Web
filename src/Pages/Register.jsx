import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import { auth, googleProvider } from '../FireBase/FireBase.init';
import Spinner from '../Components/Spinner';
import Loading from '../Components/Loading';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photoURL: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
    return regex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, photoURL } = formData;

    if (!name || !email || !password) {
      toast.error('Please fill all required fields');
      return;
    }
    if (!validatePassword(password)) {
      toast.error('Password must contain uppercase, lowercase, special char & min 6 chars');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name, photoURL });
      toast.success('Registration successful!');
      navigate('/'); // Redirect after registration
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
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-700">Join EcoTrack</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            name="photoURL"
            placeholder="Photo URL (optional)"
            value={formData.photoURL}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Register'}
          </button>
        </form>

        <button
          onClick={handleGoogleRegister}
          disabled={loading}
          className="w-full mt-4 flex items-center justify-center gap-2 border py-2 rounded hover:bg-gray-100 transition"
        >
          <FcGoogle size={20} />
          {loading ? `${<Loading/>} Loading...` : 'Register with Google'}
        </button>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link to={'/login'} className="text-green-600 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
