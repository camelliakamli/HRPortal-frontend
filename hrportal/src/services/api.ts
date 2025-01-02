import axios from 'axios';
import type { UserPayload } from '../models/user';

const API_BASE_URL = 'http://localhost:8800/api';

export const createUser = async (userData: UserPayload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/create-user`, userData);
    return response.data;
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Log the full error for debugging
    console.error('Full API Error:', error);
    
    // Extract the specific error message
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.message || 
                        'Failed to create employee';
    
    throw new Error(errorMessage);
  }
};

export const uploadDocument = async (formData: FormData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/documents/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Upload Error:', error);
    throw new Error(error.response?.data?.message || 'Failed to upload document');
  }
};

  