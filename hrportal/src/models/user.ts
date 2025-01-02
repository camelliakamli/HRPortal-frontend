import type { Moment } from 'moment';

export interface UserFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: Moment;
  gender: 'male' | 'female';
  position: string;
  role: 'employee' | 'admin';
  salary: string;
  employmentDate: Moment;
}

export interface UserPayload {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email: string;
  password: string;
  phone_number: string;
  position: string;
  salary: number;
  department: string | null;
  role: string;
  gender: string;
  hire_date: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
  hierarchy_level: number | null;
}