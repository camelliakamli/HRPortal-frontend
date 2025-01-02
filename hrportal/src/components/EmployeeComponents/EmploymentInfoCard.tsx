import React from 'react';
import { Card, Descriptions } from 'antd';

interface EmploymentInfoProps {
  position: string;
  recruitmentDate: string;
  salary: string;
  phoneNumber: string;
}

export const EmploymentInfoCard: React.FC<EmploymentInfoProps> = ({
  position,
  recruitmentDate,
  salary,
  phoneNumber,
}) => {
  return (
    <Card className="w-full shadow-sm mt-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Employment Details</h2>
      </div>
      <Descriptions column={3}>
        <Descriptions.Item label="POSITION" className="text-gray-600">
          {position}
        </Descriptions.Item>
        <Descriptions.Item label="RECRUITMENT DATE" className="text-gray-600">
          {recruitmentDate}
        </Descriptions.Item>
        <Descriptions.Item label="SALARY" className="text-gray-600">
          {salary}
        </Descriptions.Item>
        <Descriptions.Item label="PHONE NUMBER" className="text-gray-600">
          {phoneNumber}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};