/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword
} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { auth } from './firebase'; 

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState({ email: '', password: '', general: '' });
  const [showPassword, setShowPassword] = useState(false);

  const validateInputs = () => {
    let isValid = true;
    const newErrors = { email: '', password: '', general: '' };

    if (!email) {
      newErrors.email = 'Email is required!';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format!';
      isValid = false;
    }
    if (!password) {
      newErrors.password = 'Password is required!';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters!';
      isValid = false;
    }
    setError(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    setError({ email: '', password: '', general: '' });
    try {
      const persistence = remember ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistence);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (err) {
      setError((prev) => ({ ...prev, general: 'Invalid email or password!' }));
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-[url('/images/Bg-R1.jpg')] bg-contain bg-center bg-no-repeat md:bg-[url('/images/Bg1.jpg')] md:bg-cover md:bg-no-repeat">
      <div className="relative z-10 bg-white bg-opacity-90 p-6 sm:p-8 rounded-lg shadow-md w-full max-w-sm sm:max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-gray-800">Login</h2>
        {error.general && <div className="mb-4 text-red-600 text-center">{error.general}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1 font-semibold">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-400 ${error.email ? 'border-red-500' : ''}`}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error.email || error.general) {
                  setError((prev) => ({ ...prev, email: '', general: '' }));
                }
              }}
            />
            {error.email && <p className="text-red-500 text-xs mt-1">{error.email}</p>}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700 mb-1 font-semibold">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              placeholder="Enter your password"
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-400 pr-10 ${error.password ? 'border-red-500' : ''}`}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error.password || error.general) {
                  setError((prev) => ({ ...prev, password: '', general: '' }));
                }
              }}
            />
            <div className="absolute inset-y-0 top-8 right-2 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
            </div>
            {error.password && <p className="text-red-500 text-xs mt-1">{error.password}</p>}
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="remember" className="text-gray-700 text-sm">Remember Me</label>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors text-sm sm:text-base">
            Login
          </button>
          <div className="flex justify-between mt-3 text-xs sm:text-sm">
            <a href="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</a>
            <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;