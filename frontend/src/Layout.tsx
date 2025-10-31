import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { FaBuilding } from 'react-icons/fa';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg" style={{ backgroundColor: '#f8faf9' }}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header (mobile) */}
        <header className="flex items-center justify-between md:hidden mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <FaBuilding className="text-white w-4 h-4" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">MaintenancePro</h1>
            </div>
          </div>
        </header>

        {/* Main layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
          <aside className="hidden md:block md:col-span-1">
            <Sidebar />
          </aside>

          <main className="col-span-1 md:col-span-4">
            {/* Outlet renders route content */}
            <div className="bg-transparent">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
