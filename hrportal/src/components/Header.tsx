import React, { useState } from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <header className="w-full h-14 bg-white flex justify-between items-center px-6 shadow-sm  border-b border-[#DEE1E6]">
      {/* Left section (empty or for other content if needed) */}
      <div className="flex-1"></div>

      {/* Right section with bell, avatar, name, and dropdown */}
      <div className="flex items-center gap-4">
        <Bell size={24} className="text-slate-800" />
        
        <Link to="/dashboard/Profile">
          <img src="/pfp.jpeg" width={32} className="rounded-full" alt="User" />
        </Link>
        
        <span className="text-slate-800 font-semibold">Kadri Mohammed</span>

        {/* Dropdown icon */}
        <button
          onClick={toggleDropdown}
          className="text-slate-800 font-semibold flex items-center ml-2"
        >
          <ChevronDown size={20} />
        </button>
        
        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-20 bg-white shadow-lg rounded-lg w-48 py-2 px-4">
            <Link to="/dashboard/Profile" className="block text-slate-800 hover:bg-slate-100 py-1 px-2 rounded-md">
              Profile
            </Link>
            <Link to="/dashboard/Settings" className="block text-slate-800 hover:bg-slate-100 py-1 px-2 rounded-md">
              Settings
            </Link>
            <Link to="/logout" className="block text-slate-800 hover:bg-slate-100 py-1 px-2 rounded-md">
              Logout
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
