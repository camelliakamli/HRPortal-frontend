import React, { useState } from "react";
import { Table, Tag, Dropdown, Menu, Button, Input, Select, Row, Col } from "antd";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const PayrollTable: React.FC = () => {
  const data = [
    {
      key: "1",
      employeeName: "Kadri Siham",
      payDay: "2024-01-31",
      salary: "$30000.00DA",
      position: "Software Engineer",
      status: "paid",
    },
    {
      key: "2",
      employeeName: "Dib Aymen",
      payDay: "2024-02-28",
      salary: "$35000.00DA",
      position: "Product Manager",
      status: "unpaid",
    },
    {
      key: "3",
      employeeName: "Berhoune Chahd",
      payDay: "2024-03-15",
      salary: "28000.00DA",
      position: "UX Designer",
      status: "paid",
    },
  ];

  const [filteredData, setFilteredData] = useState(data);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>("all");

  const handleSearch = (value: string) => {
    setSearchText(value);
    applyFilters(value, filterStatus);
  };

  const handleStatusChange = (value: string) => {
    setFilterStatus(value);
    applyFilters(searchText, value);
  };

  const clearFilters = () => {
    setSearchText("");
    setFilterStatus("all");
    setFilteredData(data);
  };

  const applyFilters = (search: string, status: string | null) => {
    let updatedData = [...data];

    if (search) {
      updatedData = updatedData.filter((item) =>
        item.employeeName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status && status !== "all") {
      updatedData = updatedData.filter((item) => item.status === status);
    }

    setFilteredData(updatedData);
  };

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
    },
    {
      title: "Pay Day",
      dataIndex: "payDay",
      key: "payDay",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color = status === "paid" ? "green" : "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit">
                <Button type="link">Edit</Button>
              </Menu.Item>
              <Menu.Item key="delete">
                <Button type="link">Delete</Button>
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <EllipsisOutlined style={{ cursor: "pointer" }} />
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
            placeholder="Search by employee name"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Col>
        <Col span={3}>
          <Select
            placeholder="Status"
            style={{ width: "100%" }}
            onChange={handleStatusChange}
            value={filterStatus}
            allowClear
          >
            <Option value="all">All</Option>
            <Option value="paid">Paid</Option>
            <Option value="unpaid">Unpaid</Option>
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
        rowSelection={{ type: "checkbox" }}
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default PayrollTable;
