import React, { useState, useRef, useEffect } from 'react';
import { MdChat, MdClose, MdSend } from 'react-icons/md';
import styles from './HelperChatbot.module.scss';
import { clsx } from 'clsx';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

const HelperChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'bot', text: 'Hi! I am your Nexus AI helper. How can I assist you today?' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (!inputVal.trim()) return;
    
    const newUserMsg: Message = { id: Date.now().toString(), sender: 'user', text: inputVal.trim() };
    setMessages(prev => [...prev, newUserMsg]);
    setInputVal('');

    // Dummy Bot Response
    setTimeout(() => {
      let botResponse = "I'm still learning, but I can help you navigate! Try asking about 'interviews', 'analytics', or 'resume'.";
      const lowerInput = newUserMsg.text.toLowerCase();
      
      if (lowerInput.includes('interview')) {
        botResponse = 'You can take mock interviews in the Mock Interviews section to practice with AI!';
      } else if (lowerInput.includes('analytics') || lowerInput.includes('improve')) {
        botResponse = 'Check out the Analytics section to see your performance charts and areas to improve.';
      } else if (lowerInput.includes('resume')) {
        botResponse = 'Head to the Resume Analyzer to upload your resume and get ATS feedback.';
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text: botResponse }]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  return (
    <div className={styles.chatbotContainer}>
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <span>Nexus Helper</span>
            <button className={styles.closeBtn} onClick={toggleChat}>
              <MdClose />
            </button>
          </div>
          
          <div className={styles.chatBody}>
            {messages.map(msg => (
              <div key={msg.id} className={clsx(styles.messageWrapper, msg.sender === 'user' ? styles.user : styles.bot)}>
                <div className={styles.messageBubble}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.chatFooter}>
            <input 
              type="text" 
              placeholder="Ask for help..." 
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSend} className={styles.sendBtn}>
              <MdSend />
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button className={styles.floatingBtn} onClick={toggleChat}>
          <MdChat />
        </button>
      )}
    </div>
  );
};

export default HelperChatbot;
