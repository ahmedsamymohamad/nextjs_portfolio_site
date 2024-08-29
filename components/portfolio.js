"use client"
import React, { useEffect, useState } from 'react';

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const response = await fetch('/api/portfolios'); // Adjust the path if needed
        if (!response.ok) {
          throw new Error('Portfolio not found');
        }
        const data = await response.json();
        console.log("portfolioItems",data.portfolios)
        setPortfolioItems(data.portfolios || []);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchPortfolio();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (portfolioItems.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <section id="portfolio" className="bg-white bg-gray-100 py-20 relative z-10">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          My <strong>Portfolio</strong>
        </h2>
        <div className="flex flex-wrap -mx-4 justify-center">
          {portfolioItems.map((item) => (
            <div key={item.id} className="w-full md:w-1/4 px-4 mb-8">
              <div className="relative group">
                <img
                  src={item.imageUrl} // Replace with the actual property name for image URL
                  className="w-full h-full object-cover rounded"
                  alt={item.title} // Replace with the actual property name for the image alt text
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100
                group-focus:opacity-100
                transition-opacity duration-300">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3> {/* Replace with actual property name */}
                    <p>{item.description}</p>
                    <a href={item.gitHubLink} className='underline underline-offset-1 text-blue-500'>Git Hub</a>
                    <a href={item.liveDemo} className='underline underline-offset-1 text-blue-500'>Demo</a>
                     {/* Replace with actual property name */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
