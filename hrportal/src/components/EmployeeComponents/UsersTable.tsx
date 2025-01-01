import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Dropdown, Menu, Button, Input, Select, Row, Col, message } from "antd";
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
  const [users, setUsers] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filterPosition, setFilterPosition] = useState<string | undefined>(undefined);

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/users/all-users");
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fetchedUsers = response.data.map((user: any) => ({
          key: user._id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          phone: user.phone_number,
          position: user.position,
        }));
        setUsers(fetchedUsers);
        setFilteredData(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        message.error("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  // Apply filters
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

  
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMenuClick = async (e: any, user: User) => {
    if (e.key === "delete") {
      try {
        await axios.delete(`http://localhost:5000/api/users/delete-user/${user.key}`);
        message.success(`User ${user.name} deleted successfully.`);
        setUsers(users.filter((u) => u.key !== user.key));
        setFilteredData(filteredData.filter((u) => u.key !== user.key));
      } catch (error) {
        console.error("Error deleting user:", error);
        message.error("Failed to delete user.");
      }
    } else if (e.key === "modify") {
      console.log(`Modify user: ${user.name}`);
      // Handle modify action (e.g., open a modal for editing user details)
    }
  };

  const uniquePositions = Array.from(new Set(users.map((user) => user.position)));

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Position", dataIndex: "position", key: "position" },
    {
      title: "Actions",
      key: "actions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (text: any, user: User) => (
        <Dropdown
          overlay={
            <Menu onClick={(e) => handleMenuClick(e, user)}>
              <Menu.Item key="modify">Modify</Menu.Item>
              <Menu.Item key="delete">Delete</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button icon={<MoreOutlined />} type="text" />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
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

      <Table columns={columns} dataSource={filteredData} rowKey="key" />
    </div>
  );
};

export default UsersTable;
