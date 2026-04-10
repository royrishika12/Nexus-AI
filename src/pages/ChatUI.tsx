import React, { useState, useRef, useEffect } from 'react';
import { MdSend, MdAttachFile, MdMoreHoriz, MdPerson, MdSmartToy } from 'react-icons/md';
import styles from './ChatUI.module.scss';
import clsx from 'clsx';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// Simple Mock intents
const botResponses = [
  { keywords: ['resume', 'cv', 'cover'], text: "I'd be happy to review your resume or cover letter! Head over to the Resume Analyzer page or paste some bullet points here." },
  { keywords: ['hi', 'hello', 'hey'], text: "Hello there! Ready to level up your career? Ask me anything about interviews, resumes, or job hunting." },
  { keywords: ['interview', 'mock', 'questions'], text: "Interviews can be stressful! Tell me the role you are applying for and I'll generate some mock questions for us to practice." },
  { keywords: ['salary', 'negotiate'], text: "Salary negotiation is key. A good tip is to avoid providing the first number, and always research market averages using resources like Glassdoor." },
  { keywords: ['react', 'node', 'javascript', 'python'], text: "Technical interviews often focus on core concepts and big-O complexities. Want to do a quick technical quiz or review a system design concept?" }
];

const fallbackResponses = [
  "That's an interesting point. Could you elaborate more on your background regarding that?",
  "I see! Tell me more about what your specific career goals are related to this.",
  "Understood. If you need any specific data points analyzed, I can break them down for you.",
  "Let me think about that for a second... Got it! Actually, focusing on your core achievements will help amplify that.",
  "Great. Should we switch to a mock interview to practice this in real-time?"
];

const ChatUI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Nexus AI. I can help you prepare for interviews, optimize your cover letter, or discuss your career goals. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    const newUserMsg: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // AI Logic processing
    setTimeout(() => {
      let responseText = "";
      const lowerInput = userText.toLowerCase();

      // Find matching intent
      const match = botResponses.find(b => b.keywords.some(kw => lowerInput.includes(kw)));
      
      if (match) {
        responseText = match.text;
      } else {
        // Fallback random response
        responseText = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      }

      const newAiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newAiMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800); // Random delay between 1.2s - 2s
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <div className={styles.aiInfo}>
          <div className={styles.aiAvatar}>
            <MdSmartToy />
          </div>
          <div>
            <h3>Career Assistant</h3>
            <p className={styles.statusOnline}>Online</p>
          </div>
        </div>
        <button className={styles.optionsBtn}><MdMoreHoriz /></button>
      </div>

      <div className={styles.messagesArea}>
        {messages.map((msg) => (
          <div key={msg.id} className={clsx(styles.messageWrapper, msg.sender === 'user' ? styles.userWrap : styles.aiWrap)}>
            {msg.sender === 'ai' && (
              <div className={styles.msgAvatar}><MdSmartToy /></div>
            )}
            
            <div className={clsx(styles.messageBubble, msg.sender === 'user' ? styles.userMessage : styles.aiMessage)}>
              <p>{msg.text}</p>
              <span className={styles.timeWrapper}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {msg.sender === 'user' && (
              <div className={clsx(styles.msgAvatar, styles.userAvatar)}><MdPerson /></div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className={clsx(styles.messageWrapper, styles.aiWrap)}>
            <div className={styles.msgAvatar}><MdSmartToy /></div>
            <div className={clsx(styles.messageBubble, styles.aiMessage, styles.typingIndicator)}>
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputArea}>
        <button className={styles.attachBtn}>
          <MdAttachFile />
        </button>
        <input 
          type="text" 
          placeholder="Ask me anything..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          className={clsx(styles.sendBtn, inputValue.trim() ? styles.activeSend : '')} 
          onClick={handleSend}
        >
          <MdSend />
        </button>
      </div>
    </div>
  );
};

export default ChatUI;
