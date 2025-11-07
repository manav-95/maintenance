import React, { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';

import { useAuth } from '../context/AuthContext';
import axios from 'axios';

type FormState = {
    flatNo: string;
    fullName: string;
    phone: string;
    email: string;
    password: string;
};

const defaultState: FormState = {
    flatNo: '',
    fullName: '',
    phone: '',
    email: '',
    password: '',
};

const AddMembers: React.FC = () => {

    const { user } = useAuth();

    const [form, setForm] = useState<FormState>(defaultState);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const err: Record<string, string> = {};
        if (!form.flatNo.trim()) err.flatNo = 'Flat / Unit number is required';
        if (!form.fullName.trim()) err.fullName = 'Full name is required';
        if (!form.phone.trim()) err.phone = 'Phone is required';
        else if (!/^\d{10}$/.test(form.phone)) err.phone = 'Enter a valid 10-digit phone';
        if (!form.email.trim()) err.email = 'Email is required';
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Enter a valid email';
        if (!form.password) err.password = 'Password is required';
        else if (form.password.length < 6) err.password = 'Password must be at least 6 characters';
        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(null);
        if (!validate()) return;
        setSubmitting(true);
        try {

            const response = await axios.post(`${baseUrl}/society/add-member`, {
                societyId: user?.society?._id,
                ...form
            })

            if (response.status === 201) {
                setSuccess('Member added successfully.');
                setForm(defaultState);
                console.log('Created member successfully:', form);
            } else {
                console.log('Failed to add member:', response);
                setErrors({ general: response.data.message || 'Failed to add member' });
            }
        } catch (err) {
            console.error(err);
            setErrors({ general: 'Failed to add member. Try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-full p-0.5">
            <form onSubmit={handleSubmit} className="w-full h-full flex flex-col max-w-7xl bg-card rounded-sm px-6 py-5 space-y-6">
                {/* Header */}
                <div className='flex justify-between items-start w-full'>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            <FaUserPlus className="text-primary w-6 h-6" />
                            Add Member
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">Add a new resident to the society.</p>
                    </div>
                    <span className='text-sm font-semibold bg-primary/90 text-card px-3 py-1.5 rounded'>Society Name: {user?.society?.name}</span>
                </div>

                {errors.general && <div className="text-xs text-red-600">{errors.general}</div>}
                {success && <div className="text-sm text-green-600 bg-green-50 p-3 rounded-sm">{success}</div>}

                {/* Form grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Flat / Unit No.</label>
                        <input
                            name="flatNo"
                            value={form.flatNo}
                            onChange={handleChange}
                            placeholder="E.g., B-402"
                            className={`w-full rounded-sm border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${errors.flatNo ? 'border-red-300' : 'border-slate-200'}`}
                        />
                        {errors.flatNo && <p className="mt-1 text-xs text-red-600">{errors.flatNo}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Full name</label>
                        <input
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            placeholder="Resident full name"
                            className={`w-full rounded-sm border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${errors.fullName ? 'border-red-300' : 'border-slate-200'}`}
                        />
                        {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="10-digit phone"
                            maxLength={10}
                            className={`w-full rounded-sm border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${errors.phone ? 'border-red-300' : 'border-slate-200'}`}
                        />
                        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="resident@example.com"
                            className={`w-full rounded-sm border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${errors.email ? 'border-red-300' : 'border-slate-200'}`}
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Set Password</label>
                        <input
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Minimum 6 characters"
                            className={`w-full rounded-sm border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${errors.password ? 'border-red-300' : 'border-slate-200'}`}
                        />
                        {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm rounded-sm hover:brightness-95 disabled:opacity-70 shadow-sm"
                    >
                        {submitting ? 'Adding...' : 'Add Member'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddMembers;
