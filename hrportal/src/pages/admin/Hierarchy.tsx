import React from 'react';
import HierarchyTree from '../../components/HierarchyTree';

const Hierarchy: React.FC = () => {
  
  return (
    <div className="flex flex-col text-slate-800">
      <h1 className="titleText mb-4">Hierarchy Management</h1>
      <div className="pageContainer">
      <HierarchyTree />
      </div>
    </div>
  );
};


export default Hierarchy;

