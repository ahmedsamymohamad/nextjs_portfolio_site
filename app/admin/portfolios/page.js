'use client';

import { useEffect, useState } from 'react';
import AddButton from '@/components/admin/addButton';
import Link from 'next/link';
import DeleteButton from '@/components/admin/deleteButton';

export default function Portfolios() {
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const res = await fetch('/api/portfolios');
        if (!res.ok) {
          throw new Error('Failed to fetch portfolios');
        }
        const { portfolios } = await res.json();
        setPortfolios(portfolios);
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      }
    };

    fetchPortfolios();
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`/api/portfolios/${id}`, {
        method: 'DELETE',
    });

    const result = await res.json();

    if (result.success) {
      setPortfolios(portfolios.filter(portfolio => portfolio.id !== id));
        alert('portfolio deleted successfully');
    } else {
        alert(`Error deleting portfolio: ${result.error}`);
    }
};

  return (
    <div className="w-full p-4 sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700 flex flex-col gap-4">
          <Link href='/admin/portfolios/add' className='mx-auto'>
            <AddButton />
          </Link>
          {portfolios.map((portfolio) => (
            <div 
            className="py-3 sm:py-4 bg-white border hover:bg-gray-200 border-gray-200 rounded-md shadow-md p-4 flex flex-row justify-between w-full overflow-x-auto">
              <Link
                key={portfolio.id}
                href={`/admin/portfolios/${portfolio.id}`}
              >
                <div className="flex flex-row gap-4 justify-start w-full">
                  <div className="flex-1 min-w-min ms-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      ID
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {portfolio.id}
                    </p>
                  </div>
                  <div className="flex-1 min-w-min ms-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Title
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {portfolio.title}
                    </p>
                  </div>
                  <div className="flex-1 min-w-min ms-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Description
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {portfolio.description}
                    </p>
                  </div>
                  <div className="flex-1 min-w-min ms-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      GitHub Link
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {portfolio.gitHubLink}
                    </p>
                  </div>
                  <div className="flex-1 min-w-min ms-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Live Demo
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {portfolio.liveDemo}
                    </p>
                  </div>
                  <div className="flex-1 min-w-min ms-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Image URL
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <img src={portfolio.imageUrl} alt={portfolio.title} className="w-32 h-32 object-cover" />
                    </p>
                  </div>

                </div>
              </Link>
              <div className="min-w-min ms-4">
                <DeleteButton onClick={()=>handleDelete(portfolio.id)}/>
              </div>
            </div>
           
            
          ))}
        </ul>
      </div>
    </div>
  );
}
