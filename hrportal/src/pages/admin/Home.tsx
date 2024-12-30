import React from 'react';
import OverviewCards from '../../components/HomeComponents/OverviewCards'; // Adjust the import path as necessary

const Home: React.FC = () => {
  return (
    <div className="flex flex-col text-slate-800">
      <h1 className="titleText mb-4">Dashboard</h1>
      <div className="pageContainer">
        <OverviewCards />
      </div>
    </div>
  );
};

export default Home;
