import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Message from './Message';
import ChatInput from './ChatInput';
import { Message as MessageType, ChatState } from '../types';
import { fetchChatResponse, fetchEmpathyResponse } from '../services/api';

const Chat: React.FC = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatState.messages]);

  const handleSendMessage = async (text: string) => {
    const userMessage: MessageType = {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setChatState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, userMessage],
      isLoading: true,
      error: null
    }));

    try {
      const [mainResponse, empathyResponse] = await Promise.all([
        fetchChatResponse(text),
        fetchEmpathyResponse(text)
      ]);

      const empathyMessage: MessageType = {
        id: uuidv4(),
        text: empathyResponse,
        sender: 'empathy',
        timestamp: new Date()
      };

      const assistantMessage: MessageType = {
        id: uuidv4(),
        text: mainResponse,
        sender: 'assistant',
        timestamp: new Date()
      };

      setChatState(prevState => ({
        ...prevState,
        messages: [...prevState.messages, empathyMessage, assistantMessage],
        isLoading: false
      }));
    } catch (error) {
      setChatState(prevState => ({
        ...prevState,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      }));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 overflow-y-auto px-4 md:px-0">
        {chatState.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-24 pb-32">
          </div>
        ) : (
          <div className="max-w-3xl mx-auto pt-8 pb-32">
            {chatState.messages.map(message => (
              <Message key={message.id} message={message} />
            ))}

            {chatState.isLoading && (
              <div className="flex items-start gap-4 py-4 animate-fade-in relative">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium shrink-0 bg-claude-orange mt-4">AI</div>
                <div className="flex-1 p-4 rounded-lg bg-claude-bg/10 mt-4">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-claude-orange" style={{ animation: 'dotPulse 1.5s infinite ease-in-out' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-claude-orange" style={{ animation: 'dotPulse 1.5s infinite ease-in-out', animationDelay: '0.2s' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-claude-orange" style={{ animation: 'dotPulse 1.5s infinite ease-in-out', animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              </div>
            )}

            {chatState.error && (
              <div className="p-4 rounded-lg bg-red-100 text-red-800 my-4 animate-fade-in">
                Error: {chatState.error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-claude-bg border-t border-claude-border shadow-claude">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <ChatInput onSendMessage={handleSendMessage} isLoading={chatState.isLoading} />
          <div className="text-xs text-center text-claude-muted py-2">
            The assistant can make mistakes. Please double-check responses.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
