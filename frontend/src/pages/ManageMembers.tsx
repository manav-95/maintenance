import React, { useState } from 'react';
import { FaSearch, FaEdit, FaTrash, FaUser } from 'react-icons/fa';

type Member = {
    id: string;
    name: string;
    phone: string;
    email: string;
    flatNo: string;
    status: 'active' | 'inactive';
    joinedAt: string;
};

// Mock data - replace with API call
const mockData: Member[] = [
    {
        id: '1',
        name: 'John Doe',
        phone: '9876543210',
        email: 'john@example.com',
        flatNo: 'A-101',
        status: 'active',
        joinedAt: '2023-01-15'
    },
    // Add more mock data as needed
];

const ManageMembers: React.FC = () => {
    const [search, setSearch] = useState('');
    const [members] = useState<Member[]>(mockData);
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

    const filteredMembers = members.filter(member => {
        const matchesSearch = 
            member.name.toLowerCase().includes(search.toLowerCase()) ||
            member.flatNo.toLowerCase().includes(search.toLowerCase()) ||
            member.phone.includes(search);
        const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleDelete = (id: string) => {
        // TODO: Implement delete with confirmation
        console.log('Delete member:', id);
    };

    const handleEdit = (id: string) => {
        // TODO: Implement edit navigation
        console.log('Edit member:', id);
    };

    return (
        <div className="flex flex-col h-full p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Manage Members</h1>
                    <p className="text-sm text-slate-500">View and manage all society residents</p>
                </div>

                {/* Search and filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by name, flat no..."
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
                            <th className="text-left p-4 text-sm font-semibold text-slate-900">Member</th>
                            <th className="text-left p-4 text-sm font-semibold text-slate-900">Contact</th>
                            <th className="text-left p-4 text-sm font-semibold text-slate-900">Flat No.</th>
                            <th className="text-left p-4 text-sm font-semibold text-slate-900">Status</th>
                            <th className="text-right p-4 text-sm font-semibold text-slate-900">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredMembers.map((member) => (
                            <tr key={member.id} className="hover:bg-slate-50/50">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <FaUser className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">{member.name}</div>
                                            <div className="text-xs text-slate-500">Joined {new Date(member.joinedAt).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="text-sm text-slate-900">{member.phone}</div>
                                    <div className="text-xs text-slate-500">{member.email}</div>
                                </td>
                                <td className="p-4">
                                    <div className="text-sm font-medium text-slate-900">{member.flatNo}</div>
                                </td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium
                                        ${member.status === 'active' 
                                            ? 'bg-green-50 text-green-700' 
                                            : 'bg-slate-100 text-slate-700'
                                        }`}>
                                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => handleEdit(member.id)}
                                            className="p-1 hover:bg-slate-100 rounded-sm"
                                            title="Edit member"
                                        >
                                            <FaEdit className="w-4 h-4 text-slate-600" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(member.id)}
                                            className="p-1 hover:bg-red-50 rounded-sm"
                                            title="Delete member"
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
                {filteredMembers.length === 0 && (
                    <div className="text-center py-12">
                        <FaUser className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 mb-2">No members found</h3>
                        <p className="text-slate-500">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageMembers;
