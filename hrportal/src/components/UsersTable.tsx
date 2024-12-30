import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Table, Dropdown, Menu, Button, Space } from "antd";
import { MoreOutlined } from '@ant-design/icons';

interface User {
  key: string;
  name: string;
  email: string;
  phone: string;
  position: string;
}

const UsersTable: React.FC = () => {
  const users: User[] = [
    { key: '1', name: 'John Doe', email: 'johndoe@example.com', phone: '123-456-7890', position: 'Manager' },
    { key: '2', name: 'Jane Smith', email: 'janesmith@example.com', phone: '987-654-3210', position: 'Developer' },
    { key: '3', name: 'Alice Brown', email: 'alicebrown@example.com', phone: '555-123-4567', position: 'Designer' },
  ];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMenuClick = (e: any, user: User) => {
    if (e.key === 'delete') {
      // Handle delete action here
      console.log(`Delete user: ${user.name}`);
    } else if (e.key === 'modify') {
      // Handle modify action here
      console.log(`Modify user: ${user.name}`);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Actions',
      key: 'actions',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (text: any, user: User) => (
        <Dropdown
          overlay={
            <Menu onClick={(e) => handleMenuClick(e, user)}>
              <Menu.Item key="modify">Modify</Menu.Item>
              <Menu.Item key="delete">Delete</Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button icon={<MoreOutlined />} type="text" />
        </Dropdown>
      ),
    },
  ];

  return (
    <Table columns={columns} dataSource={users} />
  );
};

export default UsersTable;
