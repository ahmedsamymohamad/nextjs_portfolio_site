"use client"
import React, { useEffect, useState } from 'react';

export default function Header() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch('/api/user'); // Adjust the path if needed
        if (!response.ok) {
          throw new Error('Profile not found');
        }
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchProfile();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-screen bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/images/home-bg.jpg')" }}
      ></div>
      <section
        id="home"
        className="relative z-10 flex items-center justify-center min-h-screen bg-black bg-opacity-50"
      >
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">
              {profile.username || 'John White'} {/* Fallback to default name */}
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium mb-6 text-blue-500">
              {profile.jobTitle || 'Creative Director'} {/* Fallback to default title */}
            </h2>
            <p className="mb-8 text-lg text-gray-300">
              I am a professional <strong>{profile.profession || 'UX Designer'}</strong> and{' '}
              <strong>{profile.specialization || 'Front-End Developer'}</strong> creating modern and
              responsive designs for <strong>Web</strong> and <strong>Mobile</strong>.
              Let us work together. Thank you.
            </p>
            <a
              href="#services"
              className="btn btn-default smoothScroll px-6 py-3 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Let's Begin
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
