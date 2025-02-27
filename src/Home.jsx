/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || user.email);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); 
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 text-center"
      style={{
        backgroundImage: "url('/images/Bg2.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-amber-300">
        Welcome, {userName}!
      </h1>
      <button
        onClick={handleLogout}
        className="px-6 py-3 text-lg sm:text-xl bg-red-500 text-white rounded-lg hover:bg-red-600 transition-transform transform active:scale-95 shadow-md"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
