import React from 'react';
import { Upload } from 'antd';
import { AiOutlineCamera } from 'react-icons/ai';
import type { UploadFile } from 'antd/es/upload/interface';

interface DocumentUploadFormProps {
  fileList: UploadFile[];
  onFileChange: (info: { fileList: UploadFile[] }) => void;
}

export const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({
  fileList,
  onFileChange,
}) => (
  <div className="text-center pl-10 pr-10">
    <Upload.Dragger
      fileList={fileList}
      onChange={onFileChange}
      multiple
      beforeUpload={() => false}
      accept=".pdf,.docx"
      className="p-6 border-dashed border-2 rounded-lg"
    >
      <AiOutlineCamera size={32} color="#171A1F" />
      <p className="text-[#171A1F] mt-2">Drop Documents here</p>
      <p className="text-[#6F7787]">Supported format: pdf, docx</p>
      <p className="text-[#6F7787]">OR</p>
      <p className="text-blue-500 cursor-pointer">Browse files</p>
    </Upload.Dragger>
  </div>
);