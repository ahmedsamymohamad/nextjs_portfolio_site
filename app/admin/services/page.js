"use client"
import { useEffect, useState } from 'react';
import AddButton from '@/components/admin/addButton';
import Link from 'next/link';
import React from 'react';
import DeleteButton from '@/components/admin/deleteButton';

export default function Services() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch('/api/services');
                if (res.ok) {
                    const data = await res.json();
                    console.log(data.services)
                    // Ensure data is an array
                    setServices(data.services);
                } else {
                    const errorData = await res.json();
                    alert(errorData.error || 'Error fetching services');
                }
            } catch (error) {
                console.error('Error fetching services:', error);
                alert('An unexpected error occurred while fetching the services.');
            }
        };

        fetchServices();
    }, []);

    const handleDelete = async (id) => {
        const res = await fetch(`/api/services/${id}`, {
            method: 'DELETE',
        });
    
        const result = await res.json();
    
        if (result.success) {
            setServices(services.filter(service => service.id !== id));
            alert('service deleted successfully');
        } else {
            alert(`Error deleting service: ${result.error}`);
        }
    };

    return (
        <div className="w-full p-4 sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700 flex flex-col gap-4">
                    <Link href='/admin/services/add' className='mx-auto'>
                        <AddButton />
                    </Link>
                    {Array.isArray(services) && services.length > 0 ? (
                        services.map(service => (
                            <div
                            className="py-3 sm:py-4 bg-white border hover:bg-gray-200 border-gray-200 rounded-md shadow-md p-4 flex flex-row justify-between w-full overflow-x-auto"    
                            >
                                <Link
                                    key={service.id}
                                    href={`/admin/services/${service.id}`}

                                >
                                    <div className="flex flex-row gap-4 justify-start w-full ">
                                        <div className="flex-1 min-w-min ms-4">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                ID
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {service.id}
                                            </p>
                                        </div>
                                        <div className="flex-1 min-w-min ms-4">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                Title
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {service.title}
                                            </p>
                                        </div>
                                        <div className="flex-1 min-w-min ms-4">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                Description
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {service.description}
                                            </p>
                                        </div>

                                    </div>
                                </Link>
                                <div className="min-w-min ms-4">
                                <DeleteButton 
                                    className={'h-12'}
                                    onClick={()=>handleDelete(service.id)} />
                                </div>
                            </div>
                            
                        ))
                    ) : (
                        <p>No services found</p>
                    )}
                </ul>
            </div>
        </div>
    );
}
