import React, { useState } from 'react';
import { FaCamera, FaPaperPlane } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

type FormState = {
    title: string;
    category: string;
    description: string;
    unit: string;
    urgency: 'low' | 'medium' | 'high';
    preferredDate: string;
    photo?: File | null;
};

const defaultState: FormState = {
    title: '',
    category: 'general',
    description: '',
    unit: '',
    urgency: 'medium',
    preferredDate: '',
    photo: null,
};

const ComplaintForm: React.FC = () => {
    const { user } = useAuth() ?? {};
    const [form, setForm] = useState<FormState>({
        ...defaultState,
        unit: user?.unit ?? '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const categories = [
        { value: 'plumbing', label: 'Plumbing' },
        { value: 'electrical', label: 'Electrical' },
        { value: 'cleaning', label: 'Cleaning' },
        { value: 'security', label: 'Security' },
        { value: 'general', label: 'General / Other' },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setForm(prev => ({ ...prev, photo: file }));
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        } else {
            setPreview(null);
        }
    };

    const validate = () => {
        const err: Record<string, string> = {};
        if (!form.title.trim()) err.title = 'Title is required';
        if (!form.description.trim()) err.description = 'Description is required';
        if (!form.unit.trim()) err.unit = 'Apartment / Unit is required';
        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(null);
        if (!validate()) return;
        setSubmitting(true);

        try {
            // TODO: replace with API call (e.g., multipart/form-data if sending image)
            // const payload = new FormData();
            // payload.append('title', form.title);
            // ...
            // await api.post('/complaints', payload);

            console.log('Submit complaint:', form);
            setSuccess('Complaint submitted. The society manager will review it shortly.');
            setForm({ ...defaultState, unit: user?.unit ?? '' });
            setPreview(null);
        } catch (err) {
            console.error(err);
            setErrors({ general: 'Failed to submit. Try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-full p-0.5">
            <form onSubmit={handleSubmit} className="w-full h-full flex flex-col max-w-7xl shadow-soft-lg bg-card rounded-sm px-6 py-4">
                <div className='h-full flex flex-col space-y-6'>
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">Raise a complaint</h2>
                            <p className="text-sm text-slate-500">Describe the issue and we'll notify the society team.</p>
                        </div>
                        <div className="text-sm text-slate-600">Resident: <span className="font-medium">{user?.name ?? 'Guest'}</span></div>
                    </div>

                    {errors.general && <div className="text-xs text-red-600">{errors.general}</div>}
                    {success && <div className="text-sm text-green-600">{success}</div>}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-full rounded-sm border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                            >
                                {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Urgency</label>
                            <select
                                name="urgency"
                                value={form.urgency}
                                onChange={handleChange}
                                className="w-full rounded-sm border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Short title (e.g., Water leakage in bathroom)"
                            className={`w-full rounded-sm border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${errors.title ? 'border-red-300' : 'border-slate-200'}`}
                        />
                        {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Provide details: when it started, location, any immediate hazards..."
                            className={`w-full rounded-sm border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${errors.description ? 'border-red-300' : 'border-slate-200'}`}
                        />
                        {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Apartment / Unit</label>
                            <input
                                name="unit"
                                value={form.unit}
                                onChange={handleChange}
                                placeholder="E.g., B-402"
                                className={`w-full rounded-sm border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${errors.unit ? 'border-red-300' : 'border-slate-200'}`}
                            />
                            {errors.unit && <p className="mt-1 text-xs text-red-600">{errors.unit}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Preferred date</label>
                            <input
                                type="date"
                                name="preferredDate"
                                value={form.preferredDate}
                                onChange={handleChange}
                                className="w-full rounded-sm border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Photo (optional)</label>
                            <label className="flex items-center gap-2 w-full rounded-sm border px-3 py-2 text-sm cursor-pointer hover:bg-slate-50">
                                <FaCamera className="text-slate-600" />
                                <span className="text-slate-600">Attach image</span>
                                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
                            </label>
                            {preview && <img src={preview} alt="preview" className="mt-2 w-32 h-20 object-cover rounded-sm border" />}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm rounded-sm hover:brightness-95 disabled:opacity-70"
                        >
                            <FaPaperPlane />
                            {submitting ? 'Submitting...' : 'Submit Complaint'}
                        </button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default ComplaintForm;