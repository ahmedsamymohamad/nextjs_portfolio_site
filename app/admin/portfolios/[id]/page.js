'use client';

import { useEffect, useState } from 'react';
import Input from '@/components/input';
import TextArea from '@/components/textArea';
import SaveButton from '@/components/admin/saveButton';

export default function Portfolio({ params }) {
    const { id } = params;
    const [portfolio, setPortfolio] = useState({
        title: '',
        description: '',
        gitHubLink: '',
        liveDemo: '',
        imageUrl: ''
    });

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const res = await fetch(`/api/portfolios/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setPortfolio(prev => ({
                        ...prev,
                        ...data,
                        imageUrl: '', // Clear imageUrl as it will be handled separately
                    }));
                } else {
                    const errorData = await res.json();
                    alert(errorData.error || 'Error fetching portfolio');
                }
            } catch (error) {
                console.error('Error fetching portfolio:', error);
                alert('An unexpected error occurred while fetching the portfolio.');
            }
        };

        fetchPortfolio();
    }, [id]);

    const handleChange = async (e) => {
        const { name, value, files } = e.target;

        if (name === 'imageUrl' && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setPortfolio(prev => ({
                    ...prev,
                    imageUrl: reader.result,
                }));
            };

            reader.readAsDataURL(file);
        } else {
            setPortfolio(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/portfolios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(portfolio),
            });

            const result = await res.json();

            if (res.ok) {
                alert('Portfolio updated successfully');
            } else {
                alert(result.error || 'Error updating portfolio');
            }
        } catch (error) {
            console.error('Error updating portfolio:', error);
            alert('An unexpected error occurred while updating the portfolio.');
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
            <h3>{portfolio.imageUrl ? 'Image selected' : 'No image selected'}</h3>
            <SaveButton />
        </form>
    );
}
