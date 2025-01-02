import React from 'react';
import { Form, Input, Radio, DatePicker } from 'antd';
import type { FormInstance } from 'antd';
import type { UserFormData } from '../../models/user';

interface EmploymentDetailsFormProps {
  form: FormInstance<UserFormData>;
}

export const EmploymentDetailsForm: React.FC<EmploymentDetailsFormProps> = () => (
  <div className="grid grid-cols-2 gap-8 pl-10 pr-10">
    <div>
      <Form.Item 
        label="Position" 
        name="position" 
        rules={[{ required: true, message: 'Please enter position', whitespace: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        label="Role" 
        name="role" 
        rules={[{ required: true, message: 'Please select role' }]}
        initialValue="employee"
      >
        <Radio.Group>
          <Radio value="employee">Employee</Radio>
          <Radio value="admin">Admin</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item 
        label="Salary" 
        name="salary" 
        rules={[
          { required: true, message: 'Please enter salary' },
          { pattern: /^\d+$/, message: 'Please enter a valid number' }
        ]}
      >
        <Input />
      </Form.Item>
    </div>
    <div>
      <Form.Item 
        label="Date of Employment" 
        name="employmentDate" 
        rules={[{ required: true, message: 'Please select employment date' }]}
      >
        <DatePicker className="w-full" />
      </Form.Item>
    </div>
  </div>
);