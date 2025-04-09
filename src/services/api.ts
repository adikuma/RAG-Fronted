// api.ts
import axios from 'axios';
import { ApiRequest, ApiResponse } from '../types';

const QUERY_URL = 'https://accessable.onrender.com/query';
const EMPATH_URL = 'https://accessable.onrender.com/empath';

export const fetchChatResponse = async (query: string): Promise<string> => {
  try {
    const requestData: ApiRequest = { text: query };
    const response = await axios.post<ApiResponse>(QUERY_URL, requestData, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('API Response:', response.data);
    const responseValue = response.data.response;
    if (typeof responseValue === 'object') {
      return JSON.stringify(responseValue, null, 2);
    } else {
      return responseValue;
    }
  } catch (error) {
    console.error('Error details:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    throw new Error('CORS issue detected. This API would work with Postman or curl but is blocked by browser security. Try the fallback sample responses instead.');
  }
};

export const fetchEmpathyResponse = async (query: string): Promise<string> => {
  try {
    const requestData: ApiRequest = { text: query };
    const response = await axios.post<ApiResponse>(EMPATH_URL, requestData, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('Empathy API Response:', response.data);
    const empathyResponse = response.data.response;
    if (typeof empathyResponse === 'object' && empathyResponse !== null) {
      const respObj = empathyResponse as any;
      return respObj.response || JSON.stringify(empathyResponse, null, 2);
    }
    return empathyResponse;
  } catch (error) {
    console.error('Error fetching empathy response:', error);
    throw new Error('Error fetching empathy response');
  }
};
