import React, { useState } from 'react';
import ChatWindow from './ChatWindow';

const ChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    console.log('Chat button clicked! Opening chat...');
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {/* Chat Button */}
      <div style={{ 
        position: 'fixed', 
        bottom: '24px', 
        right: '24px', 
        zIndex: 50 
      }}>
        <button
          onClick={toggleChat}
          style={{
            backgroundColor: isChatOpen ? '#ef4444' : '#2563eb',
            color: 'white',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '20px',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          title="Chat hỗ trợ"
        >
          {isChatOpen ? '✕' : '💬'}
        </button>
      </div>

      {/* Real Chat Window */}
      {isChatOpen && (
        <ChatWindow onClose={() => setIsChatOpen(false)} />
      )}
    </>
  );
};

export default ChatButton; 