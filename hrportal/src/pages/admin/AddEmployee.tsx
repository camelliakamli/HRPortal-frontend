import React from 'react';
import AddEmployeeForm from '../../components/EmployeeComponents/AddEmployeeForm';

const AddEmployee: React.FC = () => {
  return (
    <div className="flex flex-col text-slate-800">
      <h1 className="titleText mb-4">Add New Employee</h1>
      <div className="pageContainer">
        <AddEmployeeForm />
      </div>
    </div>
  );
};

export default AddEmployee;
