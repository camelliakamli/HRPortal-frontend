import React from 'react';
import PayrollTable from '../../components/PayrollTable';

const Payroll: React.FC = () => {
  return (
    <div className="flex flex-col text-slate-800">
      <h1 className="titleText mb-4">Payroll</h1>
      <div className="pageContainer">
        <PayrollTable />
      </div>
    </div>
  );
};

export default Payroll;
