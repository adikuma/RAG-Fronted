import axios from 'axios';
import { ApiRequest, ApiResponse } from '../types';

const API_URL = 'https://accessable.onrender.com/query';

export const fetchChatResponse = async (query: string): Promise<string> => {
  try {
    const requestData: ApiRequest = {
      text: query
    };
    
    const response = await axios.post<ApiResponse>(API_URL, requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('API Response:', response.data);
    
    if (response.data && response.data.response) {
      return response.data.response;
    } else {
      throw new Error('Received invalid response format from server');
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

export const getSampleResponse = (query: string): string => {
  const queryLower = query.toLowerCase();
  
  if (queryLower.includes('roll-in shower') || queryLower.includes('shower stall')) {
    return "According to accessibility standards, the minimum dimensions for a roll-in shower stall should be 60 inches (1525 mm) wide and 30 inches (760 mm) deep with a clear floor space of 30 inches by 60 inches in front of the shower entrance.";
  }
  
  if (queryLower.includes('wheelchair') && queryLower.includes('path')) {
    return "Based on accessibility guidelines, the minimum path width for wheelchair users appears to be 1800mm in high traffic areas. In low traffic areas, such as within office work areas, the minimum path width must be at least 900 mm.";
  }
  
  return "I don't have specific information about that architectural requirement in my sample responses.";
};