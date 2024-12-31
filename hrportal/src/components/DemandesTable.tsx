import React, { useState } from "react";
import { Table, Tag, Dropdown, Menu, Button, Input, Select, Row, Col } from "antd";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const DemandesTable: React.FC = () => {
  // Sample static data
  const data = [
    {
      key: "1",
      employeeName: "Kadri Siham",
      requestType: "Congé",
      dateRequested: "2024-01-01",
      duration: "5 days",
      status: "pending",
    },
    {
      key: "2",
      employeeName: "Dib Aymen",
      requestType: "Sortie",
      dateRequested: "2024-02-15",
      duration: "2 hours",
      status: "approved",
    },
    {
      key: "3",
      employeeName: "Berhoune Chahd",
      requestType: "Télétravail",
      dateRequested: "2024-03-10",
      duration: "3 days",
      status: "rejected",
    },
  ];

  // State for filtered data and filters
  const [filteredData, setFilteredData] = useState(data);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>("all");
  const [filterRequestType, setFilterRequestType] = useState<string | null>("all");

  // Handle search
  const handleSearch = (value: string) => {
    setSearchText(value);
    applyFilters(value, filterStatus, filterRequestType);
  };

  // Handle filters
  const handleStatusChange = (value: string) => {
    setFilterStatus(value);
    applyFilters(searchText, value, filterRequestType);
  };

  const handleRequestTypeChange = (value: string) => {
    setFilterRequestType(value);
    applyFilters(searchText, filterStatus, value);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchText("");
    setFilterStatus("all");
    setFilterRequestType("all");
    setFilteredData(data);
  };

  // Apply filters
  const applyFilters = (
    search: string,
    status: string | null,
    requestType: string | null
  ) => {
    let updatedData = [...data];

    if (search) {
      updatedData = updatedData.filter((item) =>
        item.employeeName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status && status !== "all") {
      updatedData = updatedData.filter((item) => item.status === status);
    }

    if (requestType && requestType !== "all") {
      updatedData = updatedData.filter((item) => item.requestType === requestType);
    }

    setFilteredData(updatedData);
  };

  // Define columns for the table
  const columns = [
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
    },
    {
      title: "Request Type",
      dataIndex: "requestType",
      key: "requestType",
    },
    {
      title: "Date Requested",
      dataIndex: "dateRequested",
      key: "dateRequested",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "blue";
        if (status === "approved") color = "green";
        else if (status === "rejected") color = "red";
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
              <Menu.Item key="approve">
                <Button type="link">Approve</Button>
              </Menu.Item>
              <Menu.Item key="reject">
                <Button type="link">Reject</Button>
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
        <Col span={5}>
          <Select
            placeholder="Filter by Status"
            style={{ width: "100%" }}
            onChange={handleStatusChange}
            value={filterStatus}
            allowClear
          >
            <Option value="all">All</Option>
            <Option value="pending">Pending</Option>
            <Option value="approved">Approved</Option>
            <Option value="rejected">Rejected</Option>
          </Select>
        </Col>
        <Col span={5}>
          <Select
            placeholder="Filter by Request Type"
            style={{ width: "100%" }}
            onChange={handleRequestTypeChange}
            value={filterRequestType}
            allowClear
          >
            <Option value="all">All</Option>
            <Option value="Congé">Congé</Option>
            <Option value="Sortie">Sortie</Option>
            <Option value="Télétravail">Télétravail</Option>
          </Select>
        </Col>
        <Col span={6}>
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

export default DemandesTable;
