import React from 'react';
import { ProfileAvatar } from '../../components/EmployeeComponents/ProfileAvatar';
import { PersonalInfoCard } from '../../components/EmployeeComponents/PersonalInfoCrad';
import { EmploymentInfoCard } from '../../components/EmployeeComponents/EmploymentInfoCard';

const ViewEmployeeProfile: React.FC = () => {
  // This would typically come from your API/props
  const employeeData = {
    firstName: 'Dib',
    lastName: 'Mohammed',
    email: 'mohammed@gmail.com',
    phoneNumber: '0752123685',
    position: 'Team Manager',
    recruitmentDate: '02/12/2023',
    salary: '20000.00DA',
  };

  return (
    <div className="flex flex-col text-slate-800">
      <h1 className="text-2xl font-bold mb-6">Employees Profile</h1>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <ProfileAvatar
          name={`${employeeData.firstName} ${employeeData.lastName}`}
          position={employeeData.position}
        />
        
        <PersonalInfoCard
          firstName={employeeData.firstName}
          lastName={employeeData.lastName}
          email={employeeData.email}
          phoneNumber={employeeData.phoneNumber}
        />
        
        <EmploymentInfoCard
          position={employeeData.position}
          recruitmentDate={employeeData.recruitmentDate}
          salary={employeeData.salary}
          phoneNumber={employeeData.phoneNumber}
        />
      </div>
    </div>
  );
};

export default ViewEmployeeProfile;