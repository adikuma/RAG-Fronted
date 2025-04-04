import React, { useState, useEffect, useRef } from 'react'; 
import { Message as MessageType } from '../types';
import { FiCopy, FiThumbsUp, FiThumbsDown } from 'react-icons/fi';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
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

  return (
    <div
      className={`group ${
        isUser
          ? 'flex items-start gap-4 py-4 animate-fade-in'
          : 'flex items-start gap-4 py-4 animate-fade-in relative'
      }`}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium shrink-0 ${
          isUser ? 'bg-gray-700' : 'bg-claude-orange'
        }`}
      >
        {isUser ? 'A&' : 'AI'}
      </div>
      <div className="flex-1">
        <div className="mb-1 text-sm font-medium text-gray-500">
          {isUser ? 'You' : 'Assistant'}
        </div>
        <div
          className={`flex-1 leading-relaxed whitespace-pre-line text-gray-800 p-4 rounded-lg ${
            isUser ? 'bg-white shadow-md border border-blue-600' : ''
          }`}
        >
          {message.text}
        </div>

        {!isUser && (
          <div className="relative flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="flex gap-2 p-1.5 rounded-md text-gray-500 border hover:border-gray-500 hover:text-gray-700 transition-colors"
              onClick={handleCopy}
              aria-label="Copy response"
            >
              <FiCopy className="w-4 h-4 " />
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
