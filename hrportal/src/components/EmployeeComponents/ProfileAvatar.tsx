import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface ProfileAvatarProps {
  name: string;
  position: string;
  imageUrl?: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  name,
  position,
  imageUrl,
}) => {
  return (
    <div className="flex items-center mb-8">
      <Avatar
        size={80}
        icon={!imageUrl && <UserOutlined />}
        src={imageUrl}
        className="bg-blue-100"
      />
      <div className="ml-4">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-500">{position}</p>
      </div>
    </div>
  );
};

