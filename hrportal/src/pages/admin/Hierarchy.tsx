import React from 'react';
import HierarchyTree from '../../components/HierarchyTree';

const Hierarchy: React.FC = () => {
  return (
    <div className="flex flex-col text-slate-800">
      <h1 className="text-2xl font-bold mb-6">Hierarchy Management</h1>
      <div className="p-4 border bg-white shadow-md rounded-md">
        <HierarchyTree />
      </div>
    </div>
  );
};

export default Hierarchy;