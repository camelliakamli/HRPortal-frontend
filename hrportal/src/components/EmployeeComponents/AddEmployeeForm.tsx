import React, { useState } from 'react';
import { Steps, Form, Input, Button, Radio, DatePicker, Upload } from 'antd';
import { AiOutlineCamera } from 'react-icons/ai';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Step } = Steps;

const AddEmployeeForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    {
      title: 'Personal Details',
      content: (
        <Form layout="vertical" className="grid grid-cols-2 gap-8 pl-10 pr-10">
          <div className="col-span-2 flex justify-center mb-4">
            <Upload
              className="flex justify-center items-center border-dashed border-2 rounded-full h-28 w-28 overflow-hidden bg-gray-100"
              showUploadList={false}
            >
              <AiOutlineCamera size={32} color="#171A1F" />
            </Upload>
          </div>
          <div className="pr-4">
            <Form.Item label="Full Name" name="fullName">
              <Input />
            </Form.Item>
            <Form.Item label="Phone Number" name="phoneNumber">
              <Input />
            </Form.Item>
            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>
            <Form.Item label="Confirm Password" name="confirmPassword">
              <Input.Password />
            </Form.Item>
          </div>
          <div className="pl-4">
            <Form.Item label="Date of Birth" name="dob">
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password />
            </Form.Item>
            <Form.Item label="Gender" name="gender">
              <Radio.Group>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        </Form>
      ),
    },
    {
      title: 'Employment Details',
      content: (
        <Form layout="vertical" className="grid grid-cols-2 gap-8 pl-10 pr-10">
          <div>
            <Form.Item label="Position" name="position">
              <Input />
            </Form.Item>
            <Form.Item label="Role" name="role">
              <Input />
            </Form.Item>
            <Form.Item label="Salary" name="salary">
              <Input />
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Date of Employment" name="employmentDate">
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item label="Employment Status" name="employmentStatus">
              <Input />
            </Form.Item>
          </div>
        </Form>
      ),
    },
    {
      title: 'Upload Documents',
      content: (
        <div className="text-center pl-10 pr-10" >
          <Upload.Dragger
            className="p-6 border-dashed border-2 rounded-lg"
            showUploadList={false}
          >
            <AiOutlineCamera size={32} color="#171A1F" />
            <p className="text-[#171A1F] mt-2">Drop Documents here</p>
            <p className="text-[#6F7787]">Supported format: pdf, docx</p>
            <p className="text-[#6F7787]">OR</p>
            <p className="text-blue-500 cursor-pointer">Browse files</p>
          </Upload.Dragger>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Steps 
        current={currentStep}
        className="mb-6 custom-steps  pt-6 pb-4 pl-14 pr-14"
        items={steps.map((step, index) => ({
          title: (
            <div className="flex items-center">
              {index > 0 && (
                <div className="step-arrow">
                  <span className="arrow-line" />
                  <span className="arrow-head" />
                </div>
              )}
              <span>{step.title}</span>
            </div>
          ),
        }))}
      />

      <div>{steps[currentStep].content}</div>

      <div className="flex justify-between mt-6">
        {currentStep > 0 && (
          <Button
            className="bg-[#F3F4F6] text-[#565D6D] hover:bg-[#E9EAEF] ml-10 mb-6 mr-10"
            onClick={prev}
          >
            Previous
          </Button>
        )}
        <Button
          className={`ml-auto mr-10 ${
            currentStep < steps.length - 1
              ? 'bg-blue-gradient hover:bg-blue-gradient-hover text-white'
              : 'bg-blue-gradient hover:bg-blue-gradient-hover text-white'
          }`}
          onClick={currentStep < steps.length - 1 ? next : undefined}
        >
          {currentStep < steps.length - 1 ? 'Next' : 'Confirm'}
        </Button>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
