import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFileAlt, FaEye, FaFileDownload, FaTrash, FaSearch } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

type DocumentItem = {
    _id: string;
    title: string;
    description?: string;
    files: [{
        filename: string;
        path: string;
        size: number;
    }]
    createdAt: string;
};

const Documents: React.FC = () => {
    const { user } = useAuth();

    const [documents, setDocuments] = useState<DocumentItem[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [deletingId, setDeletingId] = useState<string | null>(null);


    const fetchDocuments = async () => {
        setLoading(true);
        setError(null);
        try {
            // endpoint: adjust to your API
            const res = await axios.post(`${baseUrl}/document`, {memberId:user?.id}, { withCredentials: true });
            // assume res.data is array of documents
            setDocuments(res.data.documents || []);
        } catch (err) {
            console.error(err);
            setError('Failed to load documents.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const handleDelete = async (id: string) => {
        const ok = window.confirm('Delete this document? This action cannot be undone.');
        if (!ok) return;
        setDeletingId(id);
        try {
            await axios.delete(`${baseUrl}/documents/${id}`, { withCredentials: true });
            setDocuments(prev => prev.filter(d => d._id !== id));
        } catch (err) {
            console.error(err);
            alert('Failed to delete document.');
        } finally {
            setDeletingId(null);
        }
    };

    const handleView = (url: string) => {
        window.open(url, '_blank', 'noopener');
    };

    // const filtered = documents.filter(d =>
    //     d.title.toLowerCase().includes(search.toLowerCase()) ||
    //     (d.description || '').toLowerCase().includes(search.toLowerCase())
    // );

    const formatSize = (b?: number) => {
        if (!b) return '-';
        if (b < 1024) return `${b} B`;
        if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
        return `${(b / 1024 / 1024).toFixed(2)} MB`;
    };

    return (
        <div className="p-6 flex flex-col gap-6">
            <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Documents</h1>
                    <p className="text-sm text-slate-500">Documents uploaded by your society manager</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative w-full md:w-72">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search documents..."
                            className="w-full pl-10 pr-3 py-2 rounded-sm border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                        <FaSearch className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
                    </div>
                    <button
                        type="button"
                        onClick={fetchDocuments}
                        className="px-3 py-2 bg-primary text-white rounded-sm text-sm hover:brightness-95"
                    >
                        Refresh
                    </button>
                </div>
            </header>

            {loading ? (
                <div className="text-center py-12 text-slate-500">Loading documents...</div>
            ) : error ? (
                <div className="text-center py-6 text-red-600">{error}</div>
            ) : (
                <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="text-left p-4 text-sm font-semibold text-slate-900">Title</th>
                                <th className="text-left p-4 text-sm font-semibold text-slate-900">Description</th>
                                <th className="text-left p-4 text-sm font-semibold text-slate-900">Uploaded</th>
                                <th className="text-left p-4 text-sm font-semibold text-slate-900">Documents</th>
                                <th className="text-left p-4 text-sm font-semibold text-slate-900">Size</th>
                                {/* <th className="text-right p-4 text-sm font-semibold text-slate-900">Actions</th> */}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {documents.map(doc => (
                                <tr key={doc._id} className="hover:bg-slate-50/50">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center">
                                                <FaFileAlt className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <div className="text-sm text-nowrap font-medium text-slate-900">{doc.title}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 max-w-sm">
                                        <div className="text-xs text-slate-700">{doc.description || '-'}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-xs text-slate-700">{new Date(doc.createdAt).toLocaleDateString()}</div>
                                    </td>
                                    <td className='p-4 text-xs text-nowrap'> 
                                    {doc.files.map((file, index) => (
                                        <div key={index} className='mb-1'>
                                        <a target='_blank' href={`${file.path}`} className='text-blue-400 underline hover:text-blue-500'>
                                            {file.filename}
                                        </a>
                                        </div>
                                    ))}
                                    </td>
                                    <td className="p-4 text-nowrap">
                                        <div className=" text-xs text-slate-700">
                                            {doc.files.map((file, index )=> (
                                                <div key={index}>
                                                    {formatSize(file.size)}
                                                </div>
                                            ))}
                                            </div>
                                    </td>
                                    {/* <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => handleView(`${BACKEND_URL}${doc.files[0].path}`)}
                                                title="View"
                                                className="p-2 hover:bg-slate-100 rounded-sm"
                                            >
                                                <FaEye className="w-4 h-4 text-slate-600" />
                                            </button>

                                            
                                            <a
                                                href={doc.files[0].path}
                                                download
                                                className="p-2 hover:bg-slate-100 rounded-sm"
                                                title="Download"
                                            >
                                                <FaFileDownload className="w-4 h-4 text-slate-600" />
                                            </a>

                                            <button
                                                type="button"
                                                onClick={() => handleDelete(doc._id)}
                                                disabled={deletingId === doc._id}
                                                className="p-2 hover:bg-red-50 rounded-sm"
                                                title="Delete"
                                            >
                                                <FaTrash className="w-4 h-4 text-red-500" />
                                            </button>
                                        </div>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {documents.length === 0 && (
                        <div className="text-center py-12">
                            <FaFileAlt className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-slate-900 mb-2">No documents found</h3>
                            <p className="text-slate-500">You haven’t uploaded any documents yet.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Documents;
