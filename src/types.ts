export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'assistant';
    timestamp: Date;
  }
  
  export interface ChatState {
    messages: Message[];
    isLoading: boolean;
    error: string | null;
  }
  
  export interface ApiRequest {
    text: string;
  }
  
  export interface ApiResponse {
    response: string;
  }
  
  export type Theme = 'light' | 'dark';