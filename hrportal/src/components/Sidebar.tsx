import React from 'react';
import { Home, Users, FileText, File, DollarSign, Layers, LogOut } from 'lucide-react'; // Import lucide icons
import { Link, useLocation } from 'react-router-dom';

interface MenuItem {
  text: string;
  icon: JSX.Element;
  path: string;
}

const menuItems: MenuItem[] = [
  { text: 'Dashboard', icon: <Home />, path: '/dashboard/home' },
  { text: 'Employees', icon: <Users />, path: '/dashboard/employees' },
  { text: 'Documents', icon: <FileText />, path: '/dashboard/documents' },
  { text: 'Requests', icon: <File />, path: '/dashboard/requests' },
  { text: 'Payroll', icon: <DollarSign />, path: '/dashboard/payroll' },
  { text: 'Hierarchy', icon: <Layers />, path: '/dashboard/hierarchy' },
  { text: 'Logout', icon: <LogOut />, path: '/logout' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white text-[#343D53] h-screen fixed top-0 left-0 shadow-sm border-r border-[#DEE1E6]">
      {/* Logo Section */}
      <div className="p-4 flex items-center">
        <img src="/logoAlone.png" alt="Logo" className="h-8 w-7 ml-4 align-baseline" />
        <h1 className="text-2xl text-[#3994D1] font-bold ml-2 align-middle">HRPORTAL</h1>
      </div>

      <nav className="mt-8">
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.text}>
              <Link
                to={item.path}
                className={`block px-4 py-2.5 font-medium rounded-lg flex items-center gap-4 m-4 ${
                  location.pathname === item.path
                    ? 'bg-[#109CF1] text-white' // Highlight active item
                    : 'hover:bg-[#109CF1] hover:text-white'
                }`}
              >
                <span className="w-6 h-6">{item.icon}</span>
                <span>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
