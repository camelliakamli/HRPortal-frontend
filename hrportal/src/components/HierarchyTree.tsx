import React from 'react';

// User data structure
interface User {
  id: number;
  name: string;
  position: string;
  profilePic: string;
  children?: User[];
}

// Example hierarchy data
const hierarchyData: User[] = [
  {
    id: 1,
    name: 'Kadri Mohammed',
    position: 'CEO',
    profilePic: '/blankAvatar.jpg',
    children: [
      {
        id: 2,
        name: 'Houari Nour el houda',
        position: 'Team Lead - Sales',
        profilePic: '/blankAvatar.jpg',
        children: [
          { id: 3, name: 'Dib Aymen', position: 'Sales Rep', profilePic: '/blankAvatar.jpg' },
          { id: 4, name: 'Kebbas Hanaa', position: 'Sales Rep', profilePic: '/blankAvatar.jpg' },
        ],
      },
      {
        id: 5,
        name: 'Bettayeb Chaimaa',
        position: 'Team Lead - Marketing',
        profilePic: '/blankAvatar.jpg',
        children: [
          { id: 6, name: 'Soumar Farid', position: 'Marketing Specialist', profilePic: '/blankAvatar.jpg' },
        ],
      },
    ],
  },
];

const HierarchyTree: React.FC = () => {
  const renderTree = (data: User[]) => {
    return data.map((user) => (
      <div key={user.id} className="flex flex-col items-center relative">
        {/* Line connecting parent to child */}
        {user.children && (
          <div
            className="absolute top-16 w-px bg-[#434893] left-1/2 transform -translate-x-1/2"
            style={{ height: user.children.length * 100 }} 
          ></div>
        )}

        {/* User Card */}
        <div className="relative w-48 bg-white rounded-lg shadow-sm mb-16 ml-8 mr-8">
          {/* Profile Image */}
          <div className="absolute -top-10 left-0 right-0 flex justify-center">
            <img
              src={user.profilePic}
              alt={user.name}
              className="w-16 h-16 rounded-full border-4 border-white" // Smaller avatar
            />
          </div>

          {/* Card Content */}
          <div className="p-4 pt-8 pl-2 pr-2"> {/* Add padding at the top to make space for the avatar */}
            <p className="font-bold text-[#262B33] text-center">{user.name}</p>
            <p className="text-sm text-center text-gray-500">{user.position}</p>
          </div>
        </div>

        {/* Children */}
        {user.children && (
          <div className="flex justify-between gap-12 w-full">
            {renderTree(user.children)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F4F5F7]">
      {renderTree(hierarchyData)}
    </div>
  );
};

export default HierarchyTree;
