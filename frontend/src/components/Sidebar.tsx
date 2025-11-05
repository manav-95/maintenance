import React, { useMemo, type JSX } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserPlus, FaThumbsDown, FaUsersCog, FaFileUpload } from 'react-icons/fa';
import { MdDashboard, MdPayments } from 'react-icons/md';
import { useAuth } from '../context/AuthContext'
import { BiLogOut, BiBuildings } from 'react-icons/bi';
import { TbBuildingPlus } from "react-icons/tb";
import { RiCoinsFill } from 'react-icons/ri';


const Sidebar: React.FC = () => {
    const { logout, user } = useAuth();

    const roleLinks: Record<string, { to: string; label: string; icon: JSX.Element; }[]> = {
        superAdmin: [
            { to: '/dashboard', label: 'Dashboard', icon: <MdDashboard /> },
            { to: '/add-society', label: 'Add Society', icon: <TbBuildingPlus /> },
            { to: '/manage-societies', label: 'Manage Societies', icon: <BiBuildings /> },
        ],
        admin: [
            { to: '/dashboard', label: 'Dashboard', icon: <MdDashboard /> },
            { to: '/add-members', label: 'Add Members', icon: <FaUserPlus /> },
            { to: '/manage-members', label: 'Manage Members', icon: <FaUsersCog /> },
            { to: '/upload-documents', label: 'Upload Documents', icon: <FaFileUpload /> },
            { to: '/payments', label: 'Payments', icon: <MdPayments /> },
            { to: '/expenses', label: 'Expenses', icon: <RiCoinsFill /> },
        ],
        member: [
            { to: '/dashboard', label: 'Dashboard', icon: <MdDashboard /> },
            { to: '/complaint-form', label: 'Raise Complaint', icon: <FaThumbsDown /> },
            { to: '/my-payments', label: 'My Payments', icon: <MdPayments /> },
        ],
    }

    const links = useMemo(() => {
        if (!user?.role) return [];
        return roleLinks[user.role] || [];
    }, [user?.role]);

    const active = 'flex items-center gap-3 px-3 py-2 rounded-sm bg-primary text-white';
    const inactive = 'flex items-center gap-3 px-3 py-2 rounded-sm text-slate-700 hover:bg-slate-100';

    if (!user) return null;

    return (
        <nav className="flex flex-col h-full w-full min-h-[90vh] md:w-60 bg-card backdrop-blur-sm shadow-panel border border-slate-100 rounded-md p-3">
            <div className="mb-4 px-1">
                <h3 className="text-base font-semibold text-slate-900">MaintenancePro</h3>
                <p className="text-xs text-slate-500">Society Maintenance System</p>
            </div>

            <ul className="space-y-1 flex-1">
                {links.map(l => (
                    <li key={l.to}>
                        <NavLink
                            to={l.to}
                            end
                            className={({ isActive }) => (isActive ? active : inactive)}
                        >
                            <span className="text-lg flex-shrink-0">{l.icon}</span>
                            <span className="text-sm">{l.label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>

            {/* <div className='flex flex-col justify-center items-center'>
                <p>Name: {user?.name}</p>
                <p>Role: {user?.role}</p>
            </div> */}

            {/* Logout section */}
            <div className="pt-2 mt-2 ">
                <button
                    onClick={() => logout()}
                    className="w-full flex items-center justify-center gap-3 px-3 py-2 rounded-sm bg-red-500 hover:bg-red-600 text-white transition-colors"
                >
                    <BiLogOut className="text-lg" />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </nav>
    );
};

export default Sidebar;
