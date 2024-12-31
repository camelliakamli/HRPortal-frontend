import React, { useState } from "react";
import { Table, Dropdown, Menu, Input, Select, Row, Col, Button } from "antd";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons"; // Added SearchOutlined icon
import { AiOutlineFilePdf, AiOutlineFileWord, AiOutlineFileText } from "react-icons/ai"; // Added AiOutlineFileWord for Word icon

const { Option } = Select;

const DocumentsTable: React.FC = () => {
  // Sample data
  const data = [
    {
      key: "1",
      documentName: { name: "FicheDePoste.pdf", size: "2.3 MB", type: "ficheDePoste" },
      type: "Fiche de Poste",
      employeeName: "Houari Aymen",
      dateUploaded: "2024-12-29",
    },
    {
      key: "2",
      documentName: { name: "FicheDePaie.docs", size: "1.2 MB", type: "ficheDePaie" }, // Word document example
      type: "Fiche de Paie",
      employeeName: "Dib Chaimaa",
      dateUploaded: "2024-12-28",
    },
  ];

  const [filteredData, setFilteredData] = useState(data);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState<string | null>("all");

  const handleSearch = (value: string) => {
    setSearchText(value);
    applyFilters(value, filterType);
  };

  const handleTypeChange = (value: string) => {
    setFilterType(value);
    applyFilters(searchText, value);
  };

  const clearFilters = () => {
    setSearchText("");
    setFilterType("all");
    setFilteredData(data);
  };

  const applyFilters = (search: string, type: string | null) => {
    let updatedData = [...data];

    // Apply search filter: checks both documentName and employeeName
    if (search) {
      updatedData = updatedData.filter((item) =>
        item.documentName.name.toLowerCase().includes(search.toLowerCase()) ||
        item.employeeName.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply type filter
    if (type && type !== "all") {
      updatedData = updatedData.filter((item) => item.documentName.type === type);
    }

    setFilteredData(updatedData);
  };

  const actionMenu = (
    <Menu>
      <Menu.Item key="1">View</Menu.Item>
      <Menu.Item key="2">Download</Menu.Item>
      <Menu.Item key="2">Distribuer</Menu.Item>
      <Menu.Item key="3">Delete</Menu.Item>
    </Menu>
  );

  // Define columns
  const columns = [
    {
      title: "Document Name",
      dataIndex: "documentName",
      render: (document: { name: string; size: string; type: string }) => (
        <div className="flex items-center gap-3">
          {/* Icon for document type */}
          {document.name.toLowerCase().endsWith(".pdf") ? (
            <AiOutlineFilePdf size={24} color="#d9534f" />
          ) : document.name.toLowerCase().endsWith(".docx") ? (
            <AiOutlineFileWord size={24} color="#0078d4" />
          ) : (
            <AiOutlineFileText size={24} color="#5cb85c" />
          )}
          <div>
            <div style={{ color: "#171A1F", fontWeight: 500 }}>{document.name}</div>
            <div style={{ color: "#757575", fontSize: "12px" }}>{document.size}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Employee Name",
      dataIndex: "employeeName",
    },
    {
      title: "Date Uploaded",
      dataIndex: "dateUploaded",
    },
    {
      title: "",
      dataIndex: "actions",
      render: () => (
        <Dropdown overlay={actionMenu} trigger={["click"]}>
          <EllipsisOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
        </Dropdown>
      ),
      width: 50,
    },
  ];

  return (
    <div>
      {/* Filters and search bar */}
      <Row gutter={16} style={{ marginBottom: "20px", alignItems: "center" }}>
        <Col span={8}>
          <Input
            placeholder="Search ..."
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            prefix={<SearchOutlined />} // Added search icon as prefix
          />
        </Col>
        <Col span={4}>
          <Select
            placeholder="Document Type"
            style={{ width: "100%" }}
            onChange={handleTypeChange}
            value={filterType}
            allowClear
          >
            <Option value="all">All</Option>
            <Option value="ficheDePoste">Fiche de Poste</Option>
            <Option value="ficheDePaie">Fiche de Paie</Option>
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
        dataSource={filteredData}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowSelection={{ type: "checkbox" }}
        style={{ background: "white" }}
      />
    </div>
  );
};

export default DocumentsTable;
