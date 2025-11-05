import React, { useState } from 'react';
import { FaSearch, FaEdit, FaTrash, FaEllipsisV, FaFilter } from 'react-icons/fa';
import { BiBuilding } from 'react-icons/bi';

type Society = {
    id: string;
    name: string;
    address: string;
    city: string;
    pincode: string;
    managerName: string;
    managerPhone: string;
    status: 'active' | 'inactive';
    createdAt: string;
};

// Mock data - replace with API call
const mockData: Society[] = [
    {
        id: '1',
        name: 'Green Valley Apartments',
        address: '123 Main St',
        city: 'Mumbai',
        pincode: '400001',
        managerName: 'John Doe',
        managerPhone: '9876543210',
        status: 'active',
        createdAt: '2023-01-15'
    },
    // Add more mock data as needed
];

const ManageSocieties: React.FC = () => {
    const [search, setSearch] = useState('');
    const [societies] = useState<Society[]>(mockData);
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

    const filteredSocieties = societies.filter(society => {
        const matchesSearch = society.name.toLowerCase().includes(search.toLowerCase()) ||
            society.city.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'all' || society.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleDelete = (id: string) => {
        // TODO: Implement delete with confirmation
        console.log('Delete society:', id);
    };

    const handleEdit = (id: string) => {
        // TODO: Implement edit navigation
        console.log('Edit society:', id);
    };

    return (
        <div className="flex flex-col h-full p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Manage Societies</h1>
                    <p className="text-sm text-slate-500">View and manage all registered societies</p>
                </div>

                {/* Search and filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search societies..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-sm border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                        <FaSearch className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
                        className="px-3 py-2 rounded-sm border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-auto flex-1">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-slate-50">
                            <th className="text-left p-4 text-sm font-semibold text-slate-900">Society</th>
                            <th className="text-left p-4 text-sm font-semibold text-slate-900">Location</th>
                            <th className="text-left p-4 text-sm font-semibold text-slate-900">Manager</th>
                            <th className="text-left p-4 text-sm font-semibold text-slate-900">Status</th>
                            <th className="text-right p-4 text-sm font-semibold text-slate-900">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredSocieties.map((society) => (
                            <tr key={society.id} className="hover:bg-slate-50/50">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center">
                                            <BiBuilding className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">{society.name}</div>
                                            <div className="text-xs text-slate-500">ID: {society.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="text-sm text-slate-900">{society.city}</div>
                                    <div className="text-xs text-slate-500">{society.pincode}</div>
                                </td>
                                <td className="p-4">
                                    <div className="text-sm text-slate-900">{society.managerName}</div>
                                    <div className="text-xs text-slate-500">{society.managerPhone}</div>
                                </td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium
                                        ${society.status === 'active' 
                                            ? 'bg-green-50 text-green-700' 
                                            : 'bg-slate-100 text-slate-700'
                                        }`}>
                                        {society.status.charAt(0).toUpperCase() + society.status.slice(1)}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => handleEdit(society.id)}
                                            className="p-1 hover:bg-slate-100 rounded-sm"
                                        >
                                            <FaEdit className="w-4 h-4 text-slate-600" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(society.id)}
                                            className="p-1 hover:bg-red-50 rounded-sm"
                                        >
                                            <FaTrash className="w-4 h-4 text-red-500" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Empty state */}
                {filteredSocieties.length === 0 && (
                    <div className="text-center py-12">
                        <BiBuilding className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 mb-2">No societies found</h3>
                        <p className="text-slate-500">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageSocieties;
