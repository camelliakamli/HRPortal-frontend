import type { UserFormData, UserPayload } from '../models/user';

export const formatUserPayload = (values: UserFormData): UserPayload => {
  if (!values) {
    throw new Error('Form values are required');
  }

  // Validate required fields
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'password',
    'phoneNumber',
    'position',
    'address',
  ];

  for (const field of requiredFields) {
    if (!values[field as keyof UserFormData]) {
      throw new Error(`${field} is required`);
    }
  }

  return {
    first_name: values.firstName.trim(),
    last_name: values.lastName.trim(),
    date_of_birth: values.dob.toDate().toISOString(),
    email: values.email.trim(),
    password: values.password,
    phone_number: values.phoneNumber.trim(),
    position: values.position.trim(),
    salary: Number(values.salary),
    department: null,
    role: values.role || 'employee',
    gender: values.gender || 'male',
    hire_date: values.employmentDate.toDate().toISOString(),
    address: {
      street: values.address.trim(),
      city: 'Tlemcen',
      country: 'Algeria'
    },
    hierarchy_level: null
  };
};