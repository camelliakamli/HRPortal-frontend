import React from "react";
import { Table, Dropdown, Menu } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { AiOutlineFilePdf, AiOutlineFileText } from "react-icons/ai"; // Icons for document types

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
      documentName: { name: "FicheDePaie.pdf", size: "1.2 MB", type: "ficheDePaie" },
      type: "Fiche de Paie",
      employeeName: "Dib Chaimaa",
      dateUploaded: "2024-12-28",
    },
  ];

  // Action menu
  const actionMenu = (
    <Menu>
      <Menu.Item key="1">View</Menu.Item>
      <Menu.Item key="2">Download</Menu.Item>
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
          {document.type === "ficheDePoste" ? (
            <AiOutlineFilePdf size={24} color="#d9534f" />
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
    <Table
      dataSource={data}
      columns={columns}
      pagination={{ pageSize: 5 }}
      rowSelection={{ type: "checkbox" }} 
      style={{ background: "white" }}
    />
  );
};

export default DocumentsTable;
