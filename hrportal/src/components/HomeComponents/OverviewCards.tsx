import React from 'react';
import { Card } from 'antd';
import { UserOutlined, DollarOutlined, FileOutlined, ClockCircleOutlined, AppstoreOutlined } from '@ant-design/icons';

interface CardData {
  title: string;
  count: number;
  unit: string;
  icon: React.ReactNode;
  backgroundColor: string;
  titleColor: string;
}

const OverviewCards: React.FC = () => {
  const cardData: CardData[] = [
    {
      title: 'Total Employee',
      count: 2,
      unit: 'Employees',
      icon: <UserOutlined style={{ fontSize: '24px', color: '#636AE8', transform: 'translateY(-15px)' }} />,
      backgroundColor: '#F5F2FD',
      titleColor: '#636AE8',
    },
    {
      title: 'Total Payroll',
      count: 10,
      unit: 'Transactions',
      icon: <DollarOutlined style={{ fontSize: '24px', color: '#E8618C', transform: 'translateY(-15px)' }} />,
      backgroundColor: '#FDF1F5',
      titleColor: '#E8618C',
    },
    {
      title: 'Total Requests',
      count: 15,
      unit: 'Requests',
      icon: <FileOutlined style={{ fontSize: '24px', color: '#379AE6', transform: 'translateY(-15px)' }} />,
      backgroundColor: '#F1F8FD',
      titleColor: '#379AE6',
    },
    {
      title: 'Pending Requests',
      count: 5,
      unit: 'Requests',
      icon: <ClockCircleOutlined style={{ fontSize: '24px', color: '#39BFAB', transform: 'translateY(-15px)' }} />,
      backgroundColor: '#EFFCFA',
      titleColor: '#39BFAB',
    },
  ];

  return (
    <div className="pageContainer flex flex-col gap-4 p-4">
      {/* Title Section */}
      <div className="flex items-center">
        <AppstoreOutlined style={{ fontSize: '24px', color: '#323743', marginRight: '8px' }} />
        <h2 style={{ fontSize: '18px', lineHeight: '26px' }} className="font-semibold text-gray-800">
          Overview
        </h2>
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-evenly gap-4">
        {cardData.map((data, index) => (
          <Card
            key={index}
            className="w-64 rounded-md"
            bodyStyle={{
              display: 'flex',
              alignItems: 'center',
              padding: '20px',
              backgroundColor: data.backgroundColor,
            }}
            style={{
              border: 'none', 
              boxShadow: 'none', 
            }}
          >
            <div className="mr-4">{data.icon}</div>
            <div>
              <div style={{ color: data.titleColor, fontSize: '18px' }} className="font-medium">
                {data.title}
              </div>
              <div className="font-bold text-xl mt-1">
                {data.count}{' '}
                <span className="text-sm font-normal text-gray-600">{data.unit}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OverviewCards;
