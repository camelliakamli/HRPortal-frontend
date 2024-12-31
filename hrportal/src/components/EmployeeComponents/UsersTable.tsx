import React, { useState } from "react";
import { Table, Dropdown, Menu, Button, Input, Select, Row, Col } from "antd";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

interface User {
  key: string;
  name: string;
  email: string;
  phone: string;
  position: string;
}

const UsersTable: React.FC = () => {
  const users: User[] = [
    { key: '1', name: 'Houari Nour el houda', email: 'nourhouda@example.com', phone: '0721524781', position: 'Manager' },
    { key: '2', name: 'Dib Aymen', email: 'dibaymen@example.com', phone: '0565741232', position: 'Developer' },
    { key: '3', name: 'Bettayeb Chaimaa', email: 'chaimaabet@example.com', phone: '062144103965', position: 'Designer' },
  ];

  const [filteredData, setFilteredData] = useState(users);
  const [searchText, setSearchText] = useState("");
  const [filterPosition, setFilterPosition] = useState<string | undefined>(undefined);

  const handleSearch = (value: string) => {
    setSearchText(value);
    applyFilters(value, filterPosition);
  };

  const handlePositionChange = (value: string) => {
    setFilterPosition(value);
    applyFilters(searchText, value);
  };

  const clearFilters = () => {
    setSearchText("");
    setFilterPosition(undefined);
    setFilteredData(users);
  };

  const applyFilters = (search: string, position: string | undefined) => {
    let updatedData = [...users];

    if (search) {
      updatedData = updatedData.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.toLowerCase().includes(search.toLowerCase()) ||
        user.position.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (position) {
      updatedData = updatedData.filter((user) => user.position === position);
    }

    setFilteredData(updatedData);
  };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMenuClick = (e: any, user: User) => {
    if (e.key === 'delete') {
      console.log(`Delete user: ${user.name}`);
    } else if (e.key === 'modify') {
      console.log(`Modify user: ${user.name}`);
    }
  };

  const uniquePositions = Array.from(new Set(users.map((user) => user.position)));

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Position', dataIndex: 'position', key: 'position' },
    {
      title: 'Actions',
      key: 'actions',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (text: any, user: User) => (
        <Dropdown overlay={<Menu onClick={(e) => handleMenuClick(e, user)}><Menu.Item key="modify">Modify</Menu.Item><Menu.Item key="delete">Delete</Menu.Item></Menu>} trigger={['click']}>
          <Button icon={<MoreOutlined />} type="text" />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      {/* Filters and search bar */}
      <Row gutter={16} style={{ marginBottom: "20px", alignItems: "center" }}>
        <Col span={8}>
          <Input
            placeholder="Search by name, email, phone, or position"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Col>
        <Col span={4}>
          <Select
            placeholder="Filter by Position"
            style={{ width: "100%" }}
            onChange={handlePositionChange}
            value={filterPosition}
            allowClear
          >
            {uniquePositions.map((position) => (
              <Option key={position} value={position}>
                {position}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={4}>
          <Button type="link" onClick={clearFilters}>
            Clear Filters
          </Button>
        </Col>
      </Row>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="key"
      />
    </div>
  );
};

export default UsersTable;
