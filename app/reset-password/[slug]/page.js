"use client"

import SaveButton from '@/components/admin/saveButton';
import Input from '@/components/input';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetPassword({ params }) {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/auth/reset-password/${params.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, password2 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to reset password');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/login'); // Redirect to login after success
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  if (success) {
    return (
      <div className='w-screen h-screen flex flex-col gap-5 justify-center items-center bg-white'>
        <h1 className='text-4xl font-bold text-gray-900'>Password Reset Successfully</h1>
        <p className='text-lg font-medium text-gray-600'>You will be redirected to the login page shortly...</p>
      </div>
    );
  }

  return (
    <div className='w-screen h-screen flex flex-col gap-5 justify-center items-center bg-white'>
      <h1 className='text-4xl font-bold text-gray-900'>Reset Password</h1>
      <form className='flex flex-col gap-3 w-[18rem]' onSubmit={handleSubmit}>
        <Input 
          type='password'
          placeholder='New Password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input 
          type='password'
          placeholder='Confirm your Password'
          name='password2'
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        {error && <p className='text-red-600'>{error}</p>}
        <SaveButton />
      </form>
    </div>
  );
}
