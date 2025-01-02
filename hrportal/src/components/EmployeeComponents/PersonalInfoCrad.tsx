import React from 'react';
import { Card, Descriptions } from 'antd';

interface PersonalInfoProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export const PersonalInfoCard: React.FC<PersonalInfoProps> = ({
  firstName,
  lastName,
  email,
  phoneNumber,
}) => {
  return (
    <Card className="w-full shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Personal Information</h2>
      </div>
      <Descriptions column={3}>
        <Descriptions.Item label="FIRST NAME" className="text-gray-600">
          {firstName}
        </Descriptions.Item>
        <Descriptions.Item label="LAST NAME" className="text-gray-600">
          {lastName}
        </Descriptions.Item>
        <Descriptions.Item label="EMAIL ADRESS" className="text-gray-600">
          {email}
        </Descriptions.Item>
        <Descriptions.Item label="PHONE NUMBER" className="text-gray-600">
          {phoneNumber}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};