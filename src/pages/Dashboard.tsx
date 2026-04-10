import React from 'react';
import { MdTrendingUp, MdDocumentScanner, MdCheckCircle, MdWarning, MdInsights, MdWorkOutline } from 'react-icons/md';
import styles from './Dashboard.module.scss';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.dashboard}>
      <div className={styles.welcomeSection}>
        <div className={styles.headerGlow}></div>
        <h2>Welcome back, <span>User</span>!</h2>
        <p>Your intelligent assistant for career growth and document analysis.</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.iconWrapper} ${styles.iconViolet}`}>
            <MdDocumentScanner />
          </div>
          <div className={styles.statInfo}>
            <h3>12</h3>
            <p>Resumes Analyzed</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.iconWrapper} ${styles.iconBlue}`}>
            <MdTrendingUp />
          </div>
          <div className={styles.statInfo}>
            <h3>85%</h3>
            <p>Avg. ATS Score</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.iconWrapper} ${styles.iconCyan}`}>
            <MdWorkOutline />
          </div>
          <div className={styles.statInfo}>
            <h3>4</h3>
            <p>Jobs Applied</p>
          </div>
        </div>
      </div>

      <div className={styles.actionGrid}>
        <div className={`${styles.actionCard} ${styles.resumeCard}`}>
          <div className={styles.cardHoverEffect}></div>
          <h3>Resume Analyzer</h3>
          <p>Scan your resume against JD to check ATS compatibility, missing keywords, and formatting issues.</p>
          <div className={styles.features}>
            <span><MdCheckCircle className={styles.featureIcon} /> Key Skills Match</span>
            <span><MdWarning className={styles.featureIcon} style={{color: '#f59e0b'}} /> Missing Keywords</span>
          </div>
          <button onClick={() => navigate('/analyzer')} className={styles.primaryBtn}>Analyze Resume</button>
        </div>

        <div className={`${styles.actionCard} ${styles.chatCard}`}>
          <div className={styles.cardHoverEffect}></div>
          <h3>AI Chat Assistant</h3>
          <p>Interactive mock interview preparation, custom cover letter generation, and general career advice.</p>
          <div className={styles.features}>
            <span><MdInsights className={styles.featureIcon} style={{color: '#3b82f6'}} /> Smart Insights</span>
            <span><MdCheckCircle className={styles.featureIcon} style={{color: '#3b82f6'}}/> Instant Replies</span>
          </div>
          <button onClick={() => navigate('/chat')} className={styles.secondaryBtn}>Chat Now</button>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.recentActivity}>
          <h3>Recent Activity</h3>
          <div className={styles.activityList}>
            <div className={styles.activityItem}>
              <div className={styles.activityDot}></div>
              <div className={styles.activityContent}>
                <h4>Software Engineer Resume Analyzed</h4>
                <p>Score improved from 65% to 88% after adding Python and CI/CD keywords.</p>
                <span className={styles.time}>2 hours ago</span>
              </div>
            </div>
            <div className={styles.activityItem}>
              <div className={styles.activityDot}></div>
              <div className={styles.activityContent}>
                <h4>Mock Interview Session Completed</h4>
                <p>Discussed System Design and React Performance optimization.</p>
                <span className={styles.time}>Yesterday</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.marketTrends}>
          <h3>Market Trends</h3>
          <div className={styles.trendList}>
            <div className={styles.trendItem}>
              <div className={styles.trendInfo}>
                <span className={styles.tech}>React</span>
                <span className={styles.growth}><MdTrendingUp /> +14%</span>
              </div>
              <div className={styles.progressBar}><div className={styles.progress} style={{width: '80%', background: 'linear-gradient(90deg, #61dafb, #3b82f6)'}}></div></div>
            </div>
            <div className={styles.trendItem}>
              <div className={styles.trendInfo}>
                <span className={styles.tech}>TypeScript</span>
                <span className={styles.growth}><MdTrendingUp /> +22%</span>
              </div>
              <div className={styles.progressBar}><div className={styles.progress} style={{width: '90%', background: 'linear-gradient(90deg, #3178c6, #8b5cf6)'}}></div></div>
            </div>
            <div className={styles.trendItem}>
              <div className={styles.trendInfo}>
                <span className={styles.tech}>Python</span>
                <span className={styles.growth}><MdTrendingUp /> +8%</span>
              </div>
              <div className={styles.progressBar}><div className={styles.progress} style={{width: '65%', background: 'linear-gradient(90deg, #ffde57, #f59e0b)'}}></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
