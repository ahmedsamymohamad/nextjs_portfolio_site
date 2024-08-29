"use client";

import { useState } from 'react';
import Input from '@/components/input';
import TextArea from '@/components/textArea';
import AddButton from '@/components/admin/addButton';
import { useRouter } from 'next/navigation';

export default function AddService() {
    const [service, setService] = useState({
        title: '',
        description: '',
    });

    const router = useRouter()

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
            const res = await fetch('/api/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(service),
            });

            const result = await res.json();

            if (res.ok) {
                alert('Service added successfully');
                // Optionally, clear the form or navigate to another page
                setService({
                    title: '',
                    description: '',
                });
                router.push('/admin/services')
            } else {
                alert(result.error || 'Error adding service');
            }
        } catch (error) {
            console.error('Error adding service:', error);
            alert('An unexpected error occurred while adding the service.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-2">
            <div className='flex flex-col gap-3 w-full'>
                <p className='font-normal text-gray-600 text-lg'>ID (Auto-generated)</p>
                <p className={'border border-gray-800 p-2'}>Auto-generated</p>
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

            <AddButton />
        </form>
    );
}
