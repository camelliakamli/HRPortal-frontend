import React from 'react';
import OverviewCards from '../../components/HomeComponents/OverviewCards';
import PayrollPieChart from '../../components/HomeComponents/PayrollPieChart';

const Home: React.FC = () => {
  const payrollData = {
    paid: 62,
    unpaid: 38,
  };

  return (
    <div className="flex flex-col text-slate-800">
      {/* Page Title */}
      <h1 className="titleText mb-4">Dashboard</h1>

      {/* Overview Section */}
      <div className="pageContainer">
        <OverviewCards />
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left Column: Table */}
        <div className="lg:col-span-2 bg-white rounded-lg p-4 shadow-sm">
          {/* Placeholder for the table */}
          <h2 className="text-lg font-bold mb-4">Employee Details Table</h2>
          <div className="overflow-x-auto">
          
          </div>
        </div>

        {/* Right Column: Payroll Pie Chart */}
        <div className="lg:col-span-1 bg-white rounded-lg p-4 shadow-sm">
          <PayrollPieChart data={payrollData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
