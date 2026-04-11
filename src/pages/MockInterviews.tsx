import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdPlayArrow, MdWork, MdTimer } from 'react-icons/md';
import styles from './MockInterviews.module.scss';

export const mockInterviewsList = [
  { id: '1', title: 'Frontend Engineer', role: 'React Developer', duration: 15 },
  { id: '2', title: 'Backend Engineer', role: 'Node.js Developer', duration: 15 },
  { id: '3', title: 'Fullstack Engineer', role: 'MERN Stack Developer', duration: 15 },
  { id: '4', title: 'Product Manager', role: 'Technical PM', duration: 15 },
  { id: '5', title: 'UI/UX Designer', role: 'Product Designer', duration: 15 }
];

const MockInterviews: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = (id: string) => {
    navigate(`/interview-session/${id}`);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Mock Interviews</h1>
        <p>Enhance your interview skills with targeted AI-driven mock sessions.</p>
      </header>

      <div className={styles.grid}>
        {mockInterviewsList.map(interview => (
          <div key={interview.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>
                <MdWork />
              </div>
              <h2>{interview.title}</h2>
            </div>
            <div className={styles.cardBody}>
              <p>Role: {interview.role}</p>
              <p className={styles.duration}><MdTimer /> {interview.duration} mins timer</p>
            </div>
            <button className={styles.startBtn} onClick={() => handleStart(interview.id)}>
              <MdPlayArrow /> Start Session
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MockInterviews;
