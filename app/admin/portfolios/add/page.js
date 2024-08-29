'use client';

import { useState } from 'react';
import Input from '@/components/input';
import TextArea from '@/components/textArea';
import AddButton from '@/components/admin/addButton';
import { useRouter } from 'next/navigation';

export default function AddPortfolio() {
    const router = useRouter()
    const [portfolio, setPortfolio] = useState({
        title: '',
        description: '',
        gitHubLink: '',
        liveDemo: '',
        imageUrl: null,
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setPortfolio((prev) => ({
                ...prev,
                [name]: files[0],
            }));
        } else {
            setPortfolio((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', portfolio.title);
        formData.append('description', portfolio.description);
        formData.append('gitHubLink', portfolio.gitHubLink);
        formData.append('liveDemo', portfolio.liveDemo);
        if (portfolio.imageUrl) {
            formData.append('imageUrl', portfolio.imageUrl);
        }

        try {
            const res = await fetch('/api/portfolios', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error('Server error:', errorText);
                alert('Error adding portfolio');
                return;
            }

            const result = await res.json();

            if (result.error) {
                alert(result.error);
            } else {
                alert('Portfolio added successfully');
                // Optionally reset the form or redirect
                setPortfolio({
                    title: '',
                    description: '',
                    gitHubLink: '',
                    liveDemo: '',
                    imageUrl: null,
                });
            }
            router.push('/admin/portfolios')
        } catch (error) {
            console.error('Fetch error:', error);
            alert('An unexpected error occurred');
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
                value={portfolio.title}
                onChange={handleChange}
                placeholder='Title'
            />
            <TextArea
                name='description'
                value={portfolio.description}
                onChange={handleChange}
                placeholder='Description'
            />
            <Input
                type='text'
                name='gitHubLink'
                value={portfolio.gitHubLink}
                onChange={handleChange}
                placeholder='GitHub Link'
            />
            <Input
                type='text'
                name='liveDemo'
                value={portfolio.liveDemo}
                onChange={handleChange}
                placeholder='Live Demo'
            />
            <Input
                type='file'
                name='imageUrl'
                onChange={handleChange}
                placeholder='Image URL'
            />
            <AddButton />
        </form>
    );
}
