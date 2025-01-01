import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Dropdown, Menu, Input, Select, Row, Col, Button, message } from "antd";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";
import { AiOutlineFilePdf, AiOutlineFileWord, AiOutlineFileText } from "react-icons/ai";

const { Option } = Select;

const DocumentsTable: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const [documents, setDocuments] = useState<any[]>([]); 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const [filteredData, setFilteredData] = useState<any[]>([]); 
 const [searchText, setSearchText] = useState("");
 const [filterType, setFilterType] = useState<string | null>("all");

 // Fetch documents from backend
 useEffect(() => {
   const fetchDocuments = async () => {
     try {
       const response = await axios.get("http://localhost:8800/api/documents/admin/all-documents");
       setDocuments(response.data.documents);
       setFilteredData(response.data.documents);
     } catch (error) {
       console.error("Error fetching documents:", error);
       message.error("Failed to fetch documents.");
     }
   };
   fetchDocuments();
 }, []);

 // Apply filters
 const applyFilters = (search: string, type: string | null) => {
   let updatedData = [...documents];

   if (search) {
     updatedData = updatedData.filter(
       (item) =>
         item.documentName?.toLowerCase().includes(search.toLowerCase()) ||
         item.user_id?.email?.toLowerCase().includes(search.toLowerCase())
     );
   }

   if (type && type !== "all") {
     updatedData = updatedData.filter((item) => item.type === type);
   }

   setFilteredData(updatedData);
 };

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
   setFilteredData(documents);
 };

 // Action handlers
 const handleView = async (documentId: string) => {
   try {
     const response = await axios.get(`http://localhost:8800/api/documents/view/${documentId}`, {
       responseType: 'blob'
     });
     //WHAT IS BLOB? A Blob object represents a file-like object of immutable, raw data. 
     // Create blob URL and open in new window
     const blob = new Blob([response.data], { 
       type: response.headers['content-type'] 
     });
     const url = window.URL.createObjectURL(blob);
     window.open(url, '_blank');
   } catch (error) {
     console.error("Error viewing document:", error);
     message.error("Failed to view document.");
   }
 };

 const handleDownload = async (documentId: string, fileName: string) => {
   try {
     const response = await axios.get(`http://localhost:8800/api/documents/view/${documentId}`, {
       responseType: 'blob'
     });
     
     // Create download link
     const blob = new Blob([response.data], { 
       type: response.headers['content-type'] 
     });
     const url = window.URL.createObjectURL(blob);
     const link = document.createElement('a');
     link.href = url;
     link.download = fileName || 'document';
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
     window.URL.revokeObjectURL(url);
   } catch (error) {
     console.error("Error downloading document:", error);
     message.error("Failed to download document.");
   }
 };

 const handleDelete = async (documentId: string) => {
   try {
     const response = await axios.delete(`http://localhost:8800/api/documents/document/${documentId}`);
     message.success(response.data.message);
     setDocuments(documents.filter((doc) => doc._id !== documentId));
     setFilteredData(filteredData.filter((doc) => doc._id !== documentId));
   } 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
   catch (error) {
     message.error("Failed to delete document.");
   }
 };

 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const actionMenu = (record: any) => (
   <Menu>
     <Menu.Item key="1" onClick={() => handleView(record._id)}>
       View
     </Menu.Item>
     <Menu.Item 
       key="2" 
       onClick={() => handleDownload(record._id, record.file_path.split('\\').pop())}
     >
       Download
     </Menu.Item>
     <Menu.Item key="3">Distribuer</Menu.Item>
     <Menu.Item key="4" onClick={() => handleDelete(record._id)}>
       Delete
     </Menu.Item>
   </Menu>
 );

 // Define columns
 const columns = [
   {
     title: "Document Name",
     dataIndex: "file_path",
     render: (file_path: string) => (
       <div className="flex items-center gap-3">
         {file_path.toLowerCase().endsWith(".pdf") ? (
           <AiOutlineFilePdf size={24} color="#d9534f" />
         ) : file_path.toLowerCase().endsWith(".docx") ? (
           <AiOutlineFileWord size={24} color="#0078d4" />
         ) : (
           <AiOutlineFileText size={24} color="#5cb85c" />
         )}
         <div>
           <div style={{ color: "#171A1F", fontWeight: 500 }}>
             {file_path.split("\\").pop()}
           </div>
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
     dataIndex: "user_id",
     render: (user_id: { first_name: string, last_name: string }) => `${user_id.first_name} ${user_id.last_name}`,
   },
   {
     title: "Date Uploaded",
     dataIndex: "upload_date",
     render: (upload_date: string) => {
       const date = new Date(upload_date);
       return date.toLocaleDateString('en-US', {
         year: 'numeric',
         month: 'long',
         day: 'numeric'
       });
     },
   },
   {
     title: "",
     dataIndex: "actions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
     render: (_: any, record: any) => (
       <Dropdown overlay={() => actionMenu(record)} trigger={["click"]}>
         <EllipsisOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
       </Dropdown>
     ),
     width: 50,
   },
 ];


 return (
   <div>
     <Row gutter={16} style={{ marginBottom: "20px", alignItems: "center" }}>
       <Col span={8}>
         <Input
           placeholder="Search ..."
           value={searchText}
           onChange={(e) => handleSearch(e.target.value)}
           prefix={<SearchOutlined />}
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
           <Option value="contratDeTravail">Contrat de Travail</Option>
         </Select>
       </Col>
       <Col span={4}>
         <Button type="link" onClick={clearFilters}>
           Clear Filters
         </Button>
       </Col>
     </Row>

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
