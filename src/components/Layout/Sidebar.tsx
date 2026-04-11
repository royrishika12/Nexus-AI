import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdChat, MdAssessment, MdSettings, MdWork, MdTrendingUp } from 'react-icons/md';
import { DiReact } from 'react-icons/di';
import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <DiReact className={styles.logoIcon} />
        <span className={styles.logoText}>Nexus AI</span>
      </div>

      <nav className={styles.navMenu}>
        <NavLink to="/dashboard" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <MdDashboard className={styles.icon} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/analyzer" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <MdAssessment className={styles.icon} />
          <span>Resume Analyzer</span>
        </NavLink>
        <NavLink to="/chat" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <MdChat className={styles.icon} />
          <span>Chat AI</span>
        </NavLink>
        <NavLink to="/interviews" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <MdWork className={styles.icon} />
          <span>Mock Interviews</span>
        </NavLink>
        <NavLink to="/analytics" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <MdTrendingUp className={styles.icon} />
          <span>Analytics</span>
        </NavLink>
      </nav>

      <div className={styles.bottomMenu}>
        <button className={styles.navItem}>
          <MdSettings className={styles.icon} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
