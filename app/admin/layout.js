"use client"
import SideBar from "@/components/admin/sidebar";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLayout({ children }) {

  const [error, setError] = useState(null);
  const router = useRouter();

  const logout = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError(null);

    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      // Redirect to the admin dashboard
      router.push('/');

    } catch (err) {
      setError(err.message);
    }

  }
  return (
    <div className='bg-gray-100 w-screen min-h-screen flex flex-row'>
      <div className="w-[20%] h-full p-8">
        <SideBar />
      </div>
      <div className='w-[80%] h-screen bg-white flex flex-row justify-center items-start p-24 overflow-y-auto'>
        {error && (
          <p className="mt-2 text-center text-sm text-red-600">
            {error}
          </p>
        )}
        {children}
      </div>
      <button
        onClick={(e) => logout(e)}
        className="fixed right-5 top-2 text-white bg-gray-800 p-2 rounded-sm">Logout</button>
    </div>
  )
}
