"use client"
import React, { useEffect, useState } from 'react';

export default function About() {
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
    <section id="about" className="bg-white py-20 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8">
            <h2 className="text-4xl font-bold mb-4">
              My <strong>Profile</strong>
            </h2>
            <p className="mb-2">
              <span className="font-semibold">Name:</span> {profile.username}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Email:</span> {profile.email}
            </p>
            <p className="mb-2">
              <span className="font-semibold">GitHub Account:</span> 
              <a href={profile.gitHubLink}
              className='underline underline-offset-1 text-blue-500'
              >{profile.gitHubLink}</a>
            </p>
            <p className="mb-2">
              <span className="font-semibold">Linkedin Account:</span>
              <a href={profile.linkedinLink} 
              className='underline underline-offset-1 text-blue-500'>{profile.linkedinLink}</a>
            </p>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-8">
            <h2 className="text-4xl font-bold mb-4">
              <strong>Skills</strong>
            </h2>
            <p className="mb-6">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
              diam nonummy nibh euismod tincidunt ut laoreet. Dolore magna
              aliquam erat volutpat.
            </p>
            {/* Example skill bars */}
            <div className="mb-4">
              <h4 className="text-lg font-semibold">
                Bootstrap <small className="text-gray-500 float-right">100%</small>
              </h4>
              <div className="w-full bg-gray-300 h-2 rounded">
                <div className="h-full bg-red-500 w-full rounded"></div>
              </div>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold">
                HTML5 <small className="text-gray-500 float-right">90%</small>
              </h4>
              <div className="w-full bg-gray-300 h-2 rounded">
                <div className="h-full bg-red-500 w-9/12 rounded"></div>
              </div>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold">
                CSS3 <small className="text-gray-500 float-right">80%</small>
              </h4>
              <div className="w-full bg-gray-300 h-2 rounded">
                <div className="h-full bg-red-500 w-4/5 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
