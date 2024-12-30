import React, { useState } from 'react';
import { Upload } from 'lucide-react'; 
import DocumentsTable from '../../components/DocumentsTable';

const Documents: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Function to handle file upload
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files); // Convert FileList to an array
      setUploadedFiles((prevFiles) => [...prevFiles, ...filesArray]);
      console.log('Uploaded files:', filesArray);
    }
  };

  return (
    <div className="flex flex-col text-slate-800">
      <div className="flex items-center justify-between mb-4 mt-1">
        <h1 className="titleText">Documents Management</h1>
        <div className="flex gap-4 mr-8 mt-1">

          {/* Upload Document Button */}
          <label
            className="px-4 py-2 text-sm font-medium text-white rounded-[6px] bg-blue-gradient hover:bg-blue-gradient-hover flex items-center gap-2 cursor-pointer"
          >
            <Upload size={16} /> {/* Lucide Plus icon */}
            Upload Document
            {/* Hidden file input */}
            <input
              type="file"
              multiple
              accept=".pdf,.docx,.doc"
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        </div>
      </div>
      <div className="pageContainer">
        <DocumentsTable />
      </div>
    </div>
  );
};

export default Documents;
