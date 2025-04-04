import React from 'react';
import Chat from './components/Chat';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-claude-bg text-claude-text">
      <Chat />
    </div>
  );
};

export default App;