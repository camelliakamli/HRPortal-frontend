import React, { useState, useEffect } from "react";
import { Table, Tag, Dropdown, Menu, Button, Input, Select, Row, Col, message } from "antd";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

interface Demande {
  _id: string;
  user_id: {
    first_name: string;
    last_name: string;
  };
  type: string;
  status: string;
  start_date: string;
  duration: string;
  request_date: string;
}

const DemandesTable: React.FC = () => {
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState<Demande[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>("all");
  const [filterRequestType, setFilterRequestType] = useState<string | null>("all");

  // Fetch all demandes
  const fetchDemandes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8800/api/demandes/all-demandes');
      const formattedDemandes = response.data.map((demande: Demande) => ({
        ...demande,
        key: demande._id,
      }));
      setDemandes(formattedDemandes);
      setFilteredData(formattedDemandes);
    } catch (error) {
      console.error('Error fetching demandes:', error);
      message.error('Failed to fetch demandes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemandes();
  }, []);

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
    setFilteredData(demandes);
  };

  // Apply filters
  const applyFilters = (
    search: string,
    status: string | null,
    requestType: string | null
  ) => {
    let updatedData = [...demandes];

    if (search) {
      updatedData = updatedData.filter((item) =>
        `${item.user_id.first_name} ${item.user_id.last_name}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (status && status !== "all") {
      updatedData = updatedData.filter((item) => item.status.toLowerCase() === status.toLowerCase());
    }

    if (requestType && requestType !== "all") {
      updatedData = updatedData.filter((item) => item.type === requestType);
    }

    setFilteredData(updatedData);
  };

  // Define columns for the table
  const columns = [
    {
      title: "Employee Name",
      key: "employeeName",
      render: (record: Demande) => `${record.user_id.first_name} ${record.user_id.last_name}`,
    },
    {
      title: "Request Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date Requested",
      dataIndex: "request_date",
      key: "request_date",
      render: (date: string) => new Date(date).toLocaleDateString(),
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
        if (status.toLowerCase() === "approved") color = "green";
        else if (status.toLowerCase() === "rejected") color = "red";
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
        loading={loading}
        rowSelection={{ type: "checkbox" }}
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default DemandesTable;

