"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function ForgotPassword() {
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchForgotPassword() {
      try {
        const response = await fetch('/api/auth/forgot-password'); // Adjust the path if needed
        if (!response.ok) {
          throw new Error('Error fetching forgot password endpoint');
        }
      } catch (error) {
        setError(error.message);
      }
    }
    
    fetchForgotPassword();
  }, []);

  if (error) {
    return (
      <div className='w-screen h-screen flex justify-center items-center bg-white'>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className='w-screen h-screen flex flex-col gap-5 justify-center items-center bg-white'>
      <h1 className='text-4xl font-bold text-gray-900'>Check your email</h1>
      <p className='text-lg font-medium text-gray-600'>An email has been sent to you to reset your password.</p>
      <Link href='/login' className='underline underline-offset-1 text-lg font-medium text-gray-600'>
        Back to login
      </Link>
    </div>
  );
}
  