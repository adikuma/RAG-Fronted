import React, { useState, KeyboardEvent, FormEvent, useRef, useEffect } from 'react';
import { FiSend, FiPlus } from 'react-icons/fi';

// Add styles for webkit scrollbar
const scrollbarStyle = `
  textarea::-webkit-scrollbar {
    display: none;
  }
`;

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [inputValue]);

  return (
    <>
      <style>{scrollbarStyle}</style>
      <div className="mt-auto pt-4">
        <div className="relative w-full rounded-lg bg-claude-input-bg border border-orange-600 rounded-lg shadow-claude transition-shadow hover:shadow-claude-hover">
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              ref={textareaRef}
              className="w-full p-4 rounded-xl bg-claude-input-bg focus:outline-none transition-all resize-none overflow-hidden pl-4 pr-12"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              placeholder="How can I help you today?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={isLoading}
            />
            
            <div className="absolute right-2.5 bottom-[11px] flex items-center gap-2 ">
              <button
                type="submit"
                className="p-2 bg-claude-orange/10 rounded-md hover:bg-claude-orange/20 transition-colors"
                disabled={isLoading || !inputValue.trim()}
                aria-label="Send message"
              >
                <div className="w-5 h-5 flex items-center justify-center text-claude-orange hover:text-orange-500">
                  <FiSend size={18} className="w-4 h-4" />
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatInput;