"use client"
import React, { useEffect, useState } from 'react';

export default function Services() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch('/api/services'); // Adjust the path if needed
        if (!response.ok) {
          throw new Error('Services not found');
        }
        const data = await response.json();
        console.log("services",data.services)

        setServices(data.services || []);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchServices();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (services.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <section id="services" className="bg-gray-100 py-20 relative z-10">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          My <strong>Services</strong>
        </h2>
        <div className="flex flex-wrap -mx-4 justify-center">
          {services.map((service) => (
            <div key={service.id} className="w-full md:w-1/3 px-4 mb-8">
              <div className="p-6 bg-white shadow rounded text-center">
                <i className={`fas ${service.icon} text-3xl mb-4`}></i>
                <h3 className="text-xl font-semibold uppercase mb-2">
                  {service.title}
                </h3>
                <hr className="mb-4" />
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
