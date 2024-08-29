'use client';

import { useEffect, useState } from 'react';
import Input from "@/components/input";
import SaveButton from '@/components/admin/saveButton';
import AddButton from '@/components/admin/addButton';
import DeleteButton from '@/components/admin/deleteButton';

export default function Skills() {
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState({
        title: '',
        percentage: '',
    });

    useEffect(() => {
        const fetchSkills = async () => {
            const res = await fetch('/api/skills');
            if (res.ok) {
                const data = await res.json();
                setSkills(data);
            } else {
                console.error('Failed to fetch skills');
            }
        };

        fetchSkills();
    }, []);

    const handleChange = (index, e) => {
        const updatedSkills = [...skills];
        updatedSkills[index] = {
            ...updatedSkills[index],
            [e.target.name]: e.target.value,
        };
        setSkills(updatedSkills);
    };

    const handleNewSkillChange = (e) => {
        setNewSkill({
            ...newSkill,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e, id) => {
        e.preventDefault();

        const skill = skills.find(skill => skill.id === id);

        const res = await fetch(`/api/skills/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(skill),
        });

        const result = await res.json();

        if (result.success) {
            alert('Skill updated successfully');
        } else {
            alert('Error updating skill');
        }
    };

    const handleAddSkill = async (e) => {
        e.preventDefault();

        // Ensure newSkill has valid data
        if (!newSkill.title || newSkill.percentage === '') {
            alert('Title and percentage are required');
            return;
        }

        const res = await fetch('/api/skills', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSkill),
        });

        const result = await res.json();

        if (result.success) {
            setSkills([...skills, result.skill]);
            setNewSkill({
                title: '',
                percentage: '',
            });
            alert('Skill added successfully');
        } else {
            alert(`Error adding skill: ${result.error}`);
        }
    };

    const handleDelete = async (id) => {
        const res = await fetch(`/api/skills/${id}`, {
            method: 'DELETE',
        });

        const result = await res.json();

        if (result.success) {
            setSkills(skills.filter(skill => skill.id !== id));
            alert('Skill deleted successfully');
        } else {
            alert(`Error deleting skill: ${result.error}`);
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full p-2">
            <form onSubmit={handleAddSkill} className="flex flex-col gap-4 mb-4">
                <h3>Add New Skill</h3>
                <Input
                    type="text"
                    name="title"
                    value={newSkill.title}
                    onChange={handleNewSkillChange}
                    placeholder="Skill Name"
                />
                <Input
                    type="number"
                    name="percentage"
                    value={newSkill.percentage}
                    onChange={handleNewSkillChange}
                    placeholder="Percentage"
                />
                <AddButton />
            </form>

            {Array.isArray(skills) && skills.length > 0 ? (
                skills.map((skill, index) => (
                    <form key={skill.id} onSubmit={(e) => handleSubmit(e, skill.id)} className="flex flex-col gap-4 pt-12 border-t border-t-gray-900 border-b-1 ">
                        <Input
                            type="text"
                            name="title"
                            value={skill.title}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <Input
                            type="number"
                            name="percentage"
                            value={skill.percentage}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <DeleteButton 
                        className={'w-full'}
                        onClick={() => handleDelete(skill.id)} />
                        <SaveButton />
                    </form>
                ))
            ) : (
                <p>No skills found.</p>
            )}
        </div>
    );
}
