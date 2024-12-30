import React, { ReactNode } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header'; 
import { Outlet } from 'react-router-dom';

interface DashboardLayoutProps {
  children?: ReactNode; 
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-y-auto">
      {/* Sidebar with fixed width */}
      <Sidebar />

      {/* Main Content */}
      <div
        className="transition-all duration-300 w-[98%] overflow-x-scroll rounded-sm"
        style={{ marginLeft: '250px' }} 
      >
        {/* Header */}
        <Header />

        {/* Main Content (children or Outlet) */}
        <main className="flex-1 pl-8 pt-4">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
