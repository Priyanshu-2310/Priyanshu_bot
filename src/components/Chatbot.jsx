import React, { useState, useEffect } from 'react';
import Chat from './Chat';

// TypingEffect component with a callback to notify when the typing finishes
const TypingEffect = ({ message, onTypingComplete }) => {
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < message.length) {
      const timer = setTimeout(() => {
        setDisplayedMessage((prev) => prev + message[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 100); // Adjust the delay here for the typing speed
      return () => clearTimeout(timer);
    } else {
      // Once typing is complete, call the callback function
      onTypingComplete();
    }
  }, [currentIndex, message, onTypingComplete]);

  return <p className='text-2xl  text-white '>{displayedMessage}</p>;
};

// Main Chatbot component
const Chatbot = ({ userName }) => {
  const [loading, setLoading] = useState(true);

  // This function will be called when the typing effect finishes
  const handleTypingComplete = () => {
    setLoading(false); // Hide loader and show actual component
  };

  return (
    <div className='h-[100vh] w-[100vw] bg-zinc-800 flex items-center justify-center'>
      {loading ? (
        <TypingEffect
          message={`Welcome to Priyanshu's Chatbot, ${userName}! Let's start our conversation.`}
          onTypingComplete={handleTypingComplete}
        />
      ) : (
        <div>
          <Chat  userName={userName}/>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
