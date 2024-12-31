import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UsersTable from '../../components/EmployeeComponents/UsersTable';

const Employees: React.FC = () => {
  const navigate = useNavigate(); 

  const handleAddUser = () => {
    navigate('/dashboard/employees/add'); 
  };

  return (
    <div className="flex flex-col text-slate-800">
      <div className="flex items-center justify-between mb-4 mt-1">
        <h1 className="titleText">Users Management</h1>
        <div className="flex gap-4 mr-8 mt-1">
          {/* Import CSV Button */}
          <button
            className="px-4 py-2 text-sm font-medium border rounded-[6px] text-[#45474A] border-[#DEE1E6] bg-white hover:bg-gray-100"
          >
            Import CSV
          </button>
          {/* Add New User Button */}
          <button
            onClick={handleAddUser} // Attach the navigation handler
            className="px-4 py-2 text-sm font-medium text-white rounded-[6px] bg-blue-gradient hover:bg-blue-gradient-hover flex items-center gap-2"
          >
            <Plus size={16} /> {/* Lucide Plus icon */}
            Add New User
          </button>
        </div>
      </div>
      <div className="pageContainer">
        <UsersTable />
      </div>
    </div>
  );
};

export default Employees;
