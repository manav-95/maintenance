import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

const links = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: <MdDashboard /> },
    { to: '/admin/form', label: 'Form', icon: <FaUserPlus /> },

];

const Sidebar: React.FC = () => {
    const active = 'flex items-center gap-3 px-3 py-2 rounded-sm bg-primary text-white';
    const inactive = 'flex items-center gap-3 px-3 py-2 rounded-sm text-slate-700 hover:bg-slate-100';

    return (
        <nav className="w-full md:w-56 bg-white/60 backdrop-blur-sm border border-slate-100 rounded-md p-3">
            <div className="mb-4 px-1">
                <h3 className="text-sm font-semibold text-slate-900">MaintenancePro</h3>
                <p className="text-xs text-slate-500">Society maintenance</p>
            </div>

            <ul className="space-y-1">
                {links.map(l => (
                    <li key={l.to}>
                        <NavLink
                            to={l.to}
                            end
                            className={({ isActive }) => (isActive ? active : inactive)}
                        >
                            <span className="w-4 h-4">{l.icon}</span>
                            <span className="text-sm">{l.label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Sidebar;
