import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockInterviewsList } from './MockInterviews';
import { MdTimer, MdExitToApp, MdSend, MdCheckCircle } from 'react-icons/md';
import styles from './InterviewSession.module.scss';
import { clsx } from 'clsx';

// Dummy questions mapping according to interview type. We just use a fallback if not matched.
const dummyQuestions: Record<string, { q: string, keywords: string[] }[]> = {
  '1': [
    { q: 'Can you explain the virtual DOM in React?', keywords: ['representation', 'memory', 'reconciliation', 'diffing', 'efficient'] },
    { q: 'What is the purpose of useEffect?', keywords: ['side effects', 'lifecycle', 'mount', 'unmount', 'dependencies'] },
    { q: 'How do you handle state management?', keywords: ['redux', 'context', 'zustand', 'props', 'useReducer'] }
  ],
  'fallback': [
    { q: 'Tell me about your previous experience.', keywords: ['team', 'project', 'leadership', 'agile', 'delivery'] },
    { q: 'What is your greatest strength?', keywords: ['problem solving', 'communication', 'fast learner', 'teamwork', 'technical'] },
    { q: 'Where do you see yourself in 5 years?', keywords: ['senior', 'leadership', 'architect', 'mentoring', 'growth'] }
  ]
};

const InterviewSession: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const interview = mockInterviewsList.find(i => i.id === id);

  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 mins in seconds
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answerText, setAnswerText] = useState('');
  const [scores, setScores] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);

  const questions = dummyQuestions[id!] || dummyQuestions['fallback'];
  const currentQuestion = questions[currentQIndex];

  // Timer logic
  useEffect(() => {
    if (sessionEnded || isFinished || timeLeft <= 0) {
      if (timeLeft <= 0 && !isFinished) handleFinish();
      return;
    }

    const timerInterval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timeLeft, sessionEnded, isFinished]);

  const handleNextQuestion = () => {
    if (!answerText.trim()) return;

    // Keyword scoring logic
    const answerLower = answerText.toLowerCase();
    let matchCount = 0;
    currentQuestion.keywords.forEach(kw => {
      if (answerLower.includes(kw.toLowerCase())) matchCount++;
    });
    
    // Percentage score based on 5 theoretical keywords
    const score = Math.round((matchCount / Math.max(currentQuestion.keywords.length, 1)) * 100);
    setScores(prev => [...prev, score]);

    setAnswerText('');

    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
    setSessionEnded(true);
    
    // In a real app we'd dispatch these scores to a global store
    // For now we just display it here then recommend user to check analytics
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!interview) {
    return <div className={styles.container}>Mock Interview not found.</div>;
  }

  return (
    <div className={styles.container}>
      {isFinished ? (
        <div className={styles.finishedCard}>
          <div className={styles.iconWrapper}>
            <MdCheckCircle />
          </div>
          <h2>Session Completed!</h2>
          <p>You have finished the mock interview for <strong>{interview.title}</strong>.</p>
          <div className={styles.scoreBoard}>
            <h3>Your Scores</h3>
            <ul>
              {scores.map((score, index) => (
               <li key={index}>
                 <span>Question {index + 1}</span>
                 <span className={clsx(styles.scoreBadge, score >= 60 ? styles.good : styles.bad)}>
                   {score}% Match
                 </span>
               </li>
              ))}
            </ul>
            <p className={styles.hint}>Head over to the <strong>Analytics</strong> tab to see your overall progress!</p>
          </div>
          <button className={styles.actionBtn} onClick={() => navigate('/interviews')}>
            Back to Interviews
          </button>
        </div>
      ) : (
        <div className={styles.sessionGrid}>
          <div className={styles.headerPanel}>
            <div className={styles.titleInfo}>
              <h2>{interview.title}</h2>
              <span className={styles.subtitle}>{interview.role} Mock Session</span>
            </div>
            
            <div className={styles.controls}>
              <div className={clsx(styles.timerBadge, timeLeft < 300 && styles.warning)}>
                <MdTimer /> {formatTime(timeLeft)}
              </div>
              <button className={styles.endBtn} onClick={handleFinish}>
                <MdExitToApp /> End Session
              </button>
            </div>
          </div>

          <div className={styles.questionPanel}>
            <div className={styles.qHeader}>
              <span className={styles.qNumber}>Question {currentQIndex + 1} of {questions.length}</span>
            </div>
            <h3 className={styles.questionText}>{currentQuestion.q}</h3>
            
            <div className={styles.answerArea}>
              <textarea 
                value={answerText}
                onChange={e => setAnswerText(e.target.value)}
                placeholder="Type your answer here... Make sure to include relevant technical keywords!"
                rows={10}
              />
              <button 
                className={styles.submitBtn} 
                onClick={handleNextQuestion}
                disabled={!answerText.trim()}
              >
                {currentQIndex === questions.length - 1 ? 'Submit & Finish' : 'Next Question'} <MdSend />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewSession;
