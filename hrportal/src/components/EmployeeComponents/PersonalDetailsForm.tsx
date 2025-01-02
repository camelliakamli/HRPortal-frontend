import React from 'react';
import { Form, Input, DatePicker, Radio, Upload } from 'antd';
import { AiOutlineCamera } from 'react-icons/ai';
import type { FormInstance } from 'antd';
import type { UserFormData } from '../../models/user';

interface PersonalDetailsFormProps {
  form: FormInstance<UserFormData>;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ form }) => (
  <div className="grid grid-cols-2 gap-8 pl-10 pr-10">
    <div className="col-span-2 flex justify-center mb-4">
      <Upload
        className="flex justify-center items-center border-dashed border-2 rounded-full h-28 w-28 overflow-hidden bg-gray-100"
        showUploadList={false}
      >
        <AiOutlineCamera size={32} color="#171A1F" />
      </Upload>
    </div>
    <div className="pr-4">
      <Form.Item 
        label="First Name" 
        name="firstName" 
        rules={[{ required: true, message: 'Please enter first name', whitespace: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        label="Last Name" 
        name="lastName" 
        rules={[{ required: true, message: 'Please enter last name', whitespace: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        label="Phone Number" 
        name="phoneNumber" 
        rules={[
          { required: true, message: 'Please enter phone number' },
          { pattern: /^\d{10}$/, message: 'Please enter a valid 10-digit phone number' }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        label="Address" 
        name="address" 
        rules={[{ required: true, message: 'Please enter address', whitespace: true }]}
      >
        <Input />
      </Form.Item>
    </div>
    <div className="pl-4">
      <Form.Item 
        label="Date of Birth" 
        name="dob" 
        rules={[{ required: true, message: 'Please select date of birth' }]}
      >
        <DatePicker className="w-full" />
      </Form.Item>
      <Form.Item 
        label="Email" 
        name="email" 
        rules={[
          { required: true, message: 'Please enter email' },
          { type: 'email', message: 'Please enter a valid email' }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        label="Password" 
        name="password"
        rules={[
          { required: true, message: 'Please enter password' },
          { min: 6, message: 'Password must be at least 6 characters' }
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item 
        label="Confirm Password" 
        name="confirmPassword"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Please confirm password' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Passwords do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item 
        label="Gender" 
        name="gender" 
        rules={[{ required: true, message: 'Please select gender' }]}
        initialValue="male"
      >
        <Radio.Group>
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
        </Radio.Group>
      </Form.Item>
    </div>
  </div>
);