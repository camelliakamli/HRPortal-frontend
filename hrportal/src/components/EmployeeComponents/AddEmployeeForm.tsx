import React, { useState } from 'react';
import { Steps, Form, Button, message } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { PersonalDetailsForm } from './PersonalDetailsForm';
import { EmploymentDetailsForm } from './EmploymentDetailsForm';
import { DocumentUploadForm } from './DocumentUploadForm';
import { createUser, uploadDocument } from '../../services/api';
import { formatUserPayload } from '../../utils/formatters';
import type { UserFormData } from '../../models/user';

const AddEmployeeForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm<UserFormData>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep = async () => {
    try {
      let fieldsToValidate;
      if (currentStep === 0) {
        fieldsToValidate = [
          'firstName',
          'lastName',
          'phoneNumber',
          'address',
          'dob',
          'email',
          'password',
          'confirmPassword',
          'gender'
        ];
      } else {
        fieldsToValidate = ['position', 'role', 'salary', 'employmentDate'];
      }
      await form.validateFields(fieldsToValidate);
      return true;
    } catch (error) {
      console.error('Validation error:', error);
      return false;
    }
  };

  const next = async () => {
    const isValid = await validateStep();
    if (isValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prev = () => {
    setCurrentStep(prev => prev - 1);
  };

  const createEmployee = async () => {
    try {
      setIsSubmitting(true);

      const isValid = await validateStep();
      if (!isValid) {
        return;
      }

      const values = form.getFieldsValue(true);
      console.log('Form values before submission:', values);

      const userPayload = formatUserPayload(values);
      console.log('User payload:', userPayload);

      const response = await createUser(userPayload);
      
      if (!response?.savedUser?._id) {
        throw new Error('Invalid response from server');
      }

      if (fileList.length > 0) {
        await Promise.all(fileList.map(file => {
          const formData = new FormData();
          if (!file.originFileObj) {
            throw new Error('File object is missing');
          }
          formData.append("document", file.originFileObj);
          formData.append("user_id", response.savedUser._id);
          formData.append("type", "Contrat de Travail");
          
          return uploadDocument(formData);
        }));
      }

      message.success("Employee created successfully!");
      form.resetFields();
      setFileList([]);
      setCurrentStep(0);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Failed to create employee';
      message.error(errorMessage);
      console.error("Error creating employee:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDocumentUpload = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(newFileList);
  };

  const steps = [
    {
      title: "Personal Details",
      content: (
        <Form form={form} layout="vertical" initialValues={{ gender: 'male' }}>
          <PersonalDetailsForm form={form} />
        </Form>
      ),
    },
    {
      title: "Employment Details",
      content: (
        <Form form={form} layout="vertical" initialValues={{ role: 'employee' }}>
          <EmploymentDetailsForm form={form} />
        </Form>
      ),
    },
    {
      title: "Upload Documents",
      content: <DocumentUploadForm fileList={fileList} onFileChange={handleDocumentUpload} />,
    },
  ];

  return (
    <div>
      <Steps
        current={currentStep}
        className="mb-6 custom-steps pt-6 pb-4 pl-14 pr-14"
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        items={steps.map((step, index) => ({
          title: step.title,
        }))}
      />
      <div>{steps[currentStep].content}</div>
      <div className="flex justify-between mt-6">
        {currentStep > 0 && (
          <Button
            className="bg-[#F3F4F6] text-[#565D6D] hover:bg-[#E9EAEF] ml-10 mb-6 mr-10"
            onClick={prev}
            disabled={isSubmitting}
          >
            Previous
          </Button>
        )}
        <Button
          className={`ml-auto mr-10 ${
            currentStep < steps.length - 1 
              ? "bg-blue-gradient hover:bg-blue-gradient-hover text-white" 
              : "bg-blue-gradient hover:bg-blue-gradient-hover text-white"
          }`}
          onClick={currentStep < steps.length - 1 ? next : createEmployee}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {currentStep < steps.length - 1 ? "Next" : "Confirm"}
        </Button>
      </div>
    </div>
  );
};

export default AddEmployeeForm;