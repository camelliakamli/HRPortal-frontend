import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="p-4 space-y-6 rounded-md ml-8 mr-8">
      {children}
    </div>
  );
};

export default Container;
