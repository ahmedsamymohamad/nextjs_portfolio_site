'use client';

import { useEffect, useState } from 'react';
import Input from "@/components/input";
import SaveButton from '@/components/admin/saveButton';
import AddButton from '@/components/admin/addButton';
import DeleteButton from '@/components/admin/deleteButton';

export default function Certificates() {
    const [certificates, setCertificates] = useState([]);
    const [newCertificate, setNewCertificate] = useState({
        title: '',
        organizationName: '',
        link: '',
        date: '',
    });

    useEffect(() => {
        const fetchCertificates = async () => {
            const res = await fetch('/api/certificates');
            const data = await res.json();
            setCertificates(data);
        };

        fetchCertificates();
    }, []);

    const handleChange = (index, e) => {
        const updatedCertificates = [...certificates];
        updatedCertificates[index][e.target.name] = e.target.value;
        setCertificates(updatedCertificates);
    };

    const handleNewCertificateChange = (e) => {
        setNewCertificate({
            ...newCertificate,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e, id) => {
        e.preventDefault();

        const certificate = certificates.find(cert => cert.id === id);

        const res = await fetch(`/api/certificates/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(certificate),
        });

        const result = await res.json();

        if (result.success) {
            alert('Certificate updated successfully');
        } else {
            alert('Error updating certificate');
        }
    };

    const handleAddCertificate = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/certificates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCertificate),
        });

        const result = await res.json();

        if (result.success) {
            setCertificates([...certificates, result.certificate]);
            setNewCertificate({
                title: '',
                organizationName: '',
                link: '',
                date: '',
            });
            alert('Certificate added successfully');
        } else {
            alert('Error adding certificate');
        }
    };

    const handleDelete = async (id) => {
        const res = await fetch(`/api/certificates/${id}`, {
            method: 'DELETE',
        });
    
        const result = await res.json();
    
        if (result.success) {
            setCertificates(certificates.filter(certificate => certificate.id !== id));
            alert('service deleted successfully');
        } else {
            alert(`Error deleting service: ${result.error}`);
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full p-2">
            <form onSubmit={handleAddCertificate} className="flex flex-col gap-4 mb-4">
                <h3 className='text-lg font-medium'>Add New Certificate</h3>
                <Input
                    type="text"
                    name="title"
                    value={newCertificate.title}
                    onChange={handleNewCertificateChange}
                    placeholder="Title"
                />
                <Input
                    type="text"
                    name="organizationName"
                    value={newCertificate.organizationName}
                    onChange={handleNewCertificateChange}
                    placeholder="Organization Name"
                />
                <Input
                    type="text"
                    name="link"
                    value={newCertificate.link}
                    onChange={handleNewCertificateChange}
                    placeholder="Link"
                />
                <Input
                    type="text"
                    name="date"
                    value={newCertificate.date}
                    onChange={handleNewCertificateChange}
                    placeholder="Date"
                />
                <AddButton />
            </form>

            {Array.isArray(certificates) && certificates.length > 0 ? (
                certificates.map((cert, index) => (
                    <form
                        className="flex flex-col gap-4 pt-12 border-t border-t-gray-900 border-b-1 "
                        key={cert.id}
                        onSubmit={(e) => handleSubmit(e, cert.id)} >
                        <Input
                            type="text"
                            name="title"
                            value={cert.title}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <Input
                            type="text"
                            name="organizationName"
                            value={cert.organizationName}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <Input
                            type="text"
                            name="link"
                            value={cert.link}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <Input
                            type="text"
                            name="date"
                            value={cert.date}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <DeleteButton
                        className={'w-full'}
                        onClick={()=>handleDelete(cert.id)} />
                        <SaveButton />
                    </form>
                ))) : (
                <p>No certificates found.</p>
            )}
        </div>
    );
}
