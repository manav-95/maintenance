import axios from 'axios';
import React, { useState } from 'react';
import { FaFileUpload, FaFile, FaTimes } from 'react-icons/fa';

import { useAuth } from '../context/AuthContext';

type FormState = {
    title: string;
    description: string;
    documents: File[];
};

const defaultState: FormState = {
    title: '',
    description: '',
    documents: [],
};

const UploadDocument: React.FC = () => {
    
    const { user } = useAuth();

    const [form, setForm] = useState<FormState>(defaultState);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setForm(prev => ({
            ...prev,
            documents: [...prev.documents, ...files]
        }));
    };

    const removeFile = (index: number) => {
        setForm(prev => ({
            ...prev,
            documents: prev.documents.filter((_, i) => i !== index)
        }));
    };

    const validate = () => {
        const err: Record<string, string> = {};
        if (!form.title.trim()) err.title = 'Title is required';
        if (!form.description.trim()) err.description = 'Description is required';
        if (form.documents.length === 0) err.documents = 'At least one document is required';
        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(null);
        if (!validate()) return;
        setSubmitting(true);

        try {
            // TODO: Replace with your API call using FormData
            const formData = new FormData();
            formData.append('title', form.title);
            formData.append('description', form.description);
            formData.append('manager', user?.id || '');
            form.documents.forEach(file => {
                formData.append('documents', file);
            });

            const response = await axios.post(`${baseUrl}/document/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (response.status === 201) {
                console.log('Documents uploaded successfully');
                setSuccess('Documents uploaded successfully.');
                setForm(defaultState);
            } else {
                console.error('Failed to upload documents');
                alert( response.data.message ||'Failed to upload documents. Please try again.');
            }

        } catch (error: any) {
            console.error("Upload failed:", error.response?.data || error.message);
            setErrors({ general: 'Failed to upload documents. Please try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-full p-0.5">
            <form onSubmit={handleSubmit} className="w-full h-full flex flex-col max-w-4xl bg-card rounded-sm px-6 py-4 mx-auto">
                {/* Header */}
                <div className="border-b border-slate-200 pb-4">
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <FaFileUpload className="text-primary" />
                        Upload Documents
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">Share important documents with society members</p>
                </div>

                <div className="space-y-6 py-6">
                    {errors.general && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-sm">{errors.general}</div>}
                    {success && <div className="text-sm text-green-600 bg-green-50 p-3 rounded-sm">{success}</div>}

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Document Title</label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Enter document title"
                            className={`w-full rounded-sm border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${errors.title ? 'border-red-300' : 'border-slate-200'}`}
                        />
                        {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Provide a brief description of the documents"
                            className={`w-full rounded-sm border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${errors.description ? 'border-red-300' : 'border-slate-200'}`}
                        />
                        {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Documents</label>
                        <label className="flex flex-col items-center justify-center w-full h-32 px-4 border-2 border-slate-200 border-dashed rounded-sm cursor-pointer hover:bg-slate-50 transition">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <FaFileUpload className="w-8 h-8 text-slate-400 mb-2" />
                                <p className="text-sm text-slate-500">Click to upload or drag and drop</p>
                                <p className="text-xs text-slate-400">PDF, DOC, DOCX, XLS, XLSX (Max 10MB each)</p>
                            </div>
                            <input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="hidden"
                                accept=".pdf,.doc,.docx,.xls,.xlsx"
                            />
                        </label>
                        {errors.documents && <p className="mt-1 text-xs text-red-600">{errors.documents}</p>}

                        {/* File List */}
                        {form.documents.length > 0 && (
                            <div className="mt-4 space-y-2">
                                <h4 className="text-sm font-medium text-slate-700">Selected Files:</h4>
                                <div className="space-y-2">
                                    {form.documents.map((file, index) => (
                                        <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded-sm">
                                            <div className="flex items-center gap-2">
                                                <FaFile className="text-slate-400" />
                                                <span className="text-sm text-slate-600">{file.name}</span>
                                                <span className="text-xs text-slate-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFile(index)}
                                                className="p-1 hover:bg-slate-200 rounded-sm"
                                            >
                                                <FaTimes className="w-4 h-4 text-slate-500" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-6 border-t border-slate-200">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm rounded-sm hover:brightness-95 disabled:opacity-70"
                    >
                        {submitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Uploading...</span>
                            </>
                        ) : (
                            <>
                                <FaFileUpload className="w-4 h-4" />
                                <span>Upload Documents</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UploadDocument;
