"use client"
import { useEffect, useState } from 'react';
import Input from "@/components/input";
import TextArea from "@/components/textArea";
import SaveButton from "@/components/admin/saveButton";

export default function Admin() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '', // Initially empty, user can enter a new password if they want to change it
    jobTitle: '',
    bio: '',
    gitHubLink: '',
    linkedinLink: '',
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch('/api/user');
      const data = await res.json();

      if (data) {
        setFormData({
          username: data.username,
          email: data.email,
          password: '', // Leave this empty to not show the current password
          jobTitle: data.jobTitle || '',
          bio: data.bio || '',
          gitHubLink: data.gitHubLink || '',
          linkedinLink: data.linkedinLink || '',
        });
      }
    };

    fetchUserData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (result.success) {
      alert('User data updated successfully');
    } else {
      alert('Error updating user data');
    }
  };

  return (
    <form className="flex flex-col gap-4 w-full p-2" onSubmit={handleSubmit}>
      <Input type="text" name="username" value={formData.username} onChange={handleChange} />
      <Input type="email" name="email" value={formData.email} onChange={handleChange} />
      <Input type="password" name="password" placeholder="Enter new password if you want to change it" value={formData.password} onChange={handleChange} />
      <Input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
      <TextArea name="bio" value={formData.bio} onChange={handleChange} />
      <Input type="text" name="gitHubLink" value={formData.gitHubLink} onChange={handleChange} />
      <Input type="text" name="linkedinLink" value={formData.linkedinLink} onChange={handleChange} />
      <SaveButton />
    </form>
  );
}
