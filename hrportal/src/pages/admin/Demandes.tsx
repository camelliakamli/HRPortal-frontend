import React from 'react';
import DemandesTable from '../../components/DemandesTable';

const Demandes: React.FC = () => {
  return (
    <div className="flex flex-col text-slate-800">
      <h1 className="titleText mb-4">Requests Management</h1>
      <div className="pageContainer">
        <DemandesTable />
      </div>
    </div>
  );
};

export default Demandes;
