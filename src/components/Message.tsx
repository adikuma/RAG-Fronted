// src/components/Message.tsx

import React, { useState, useEffect, useRef } from 'react';
import { Message as MessageType } from '../types';
import { FiCopy } from 'react-icons/fi';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    navigator.clipboard
      .writeText(message.text) 
      .then(() => {
        setShowTooltip(true);
        timeoutRef.current = setTimeout(() => {
          setShowTooltip(false);
          timeoutRef.current = null;
        }, 1500);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  const isUser = message.sender === 'user';
  const isAssistant = message.sender === 'assistant'; 

  return (
    <div
      className={`group flex items-start gap-4 py-4 animate-fade-in ${
        isAssistant ? 'relative' : ''
      }`}
    >
      {/* Icon */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium shrink-0 ${
          isUser ? 'bg-gray-700' : 'bg-claude-orange' 
        }`}
      >
        {isUser ? 'You' : 'AI'}
      </div>

      <div className="flex-1">
        <div className="mb-1 text-sm font-medium text-gray-500">
          {isUser ? 'You' : 'Assistant'}
        </div>

        <div
          className={`flex-1 leading-relaxed whitespace-pre-line p-4 rounded-lg ${
            isUser ? 'bg-white shadow-md border border-blue-600' : 'bg-claude-bg/10'
          }`}
        >
          {isAssistant && message.empathyText && (
            <div className="border border-blue-400 bg-blue-50 text-blue-800 p-3 rounded-md mb-3 text-sm">
              <strong>💡 User Sentiments: </strong>
              {message.empathyText}
            </div>
          )}
          {message.text}
        </div>

        {isAssistant && (
          <div className="relative flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="flex gap-2 p-1.5 rounded-md text-gray-500 border hover:border-gray-500 hover:text-gray-700 transition-colors"
              onClick={handleCopy}
              aria-label="Copy response"
            >
              <FiCopy className="w-4 h-4" />
              <div className="text-xs">Copy Response</div>
            </button>
            {showTooltip && (
              <div
                className="absolute -top-8 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-10"
                role="status"
              >
                Response copied!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
