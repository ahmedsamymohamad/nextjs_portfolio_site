"use client"
import SaveButton from '@/components/admin/saveButton';
import Input from '@/components/input';
import TextArea from '@/components/textArea';
import React, { useState, useEffect } from 'react';

export default function Service({ params }) {
    const { id } = params;
    const [service, setService] = useState({
        title: '',
        description: '',
    });

    useEffect(() => {
        const fetchService = async () => {
            try {
                const res = await fetch(`/api/services/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setService(data);
                } else {
                    const errorData = await res.json();
                    alert(errorData.error || 'Error fetching service');
                }
            } catch (error) {
                console.error('Error fetching service:', error);
                alert('An unexpected error occurred while fetching the service.');
            }
        };

        fetchService();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setService((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/services/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(service),
            });

            const result = await res.json();

            if (res.ok) {
                alert('Service updated successfully');
            } else {
                alert(result.error || 'Error updating service');
            }
        } catch (error) {
            console.error('Error updating service:', error);
            alert('An unexpected error occurred while updating the service.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-2">
            <div className='flex flex-col gap-3 w-full'>
                <p className='font-normal text-gray-600 text-lg'>ID</p>
                <p className={'border border-gray-800 p-2'}>{id}</p>
            </div>
            <Input
                type='text'
                name='title'
                value={service.title}
                onChange={handleChange}
                placeholder='Title'
            />
            <TextArea
                name='description'
                value={service.description}
                onChange={handleChange}
                placeholder='Description'
            />
            <SaveButton />
        </form>
    );
}
