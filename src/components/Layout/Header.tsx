import React from 'react';
import { useLocation } from 'react-router-dom';
import { MdNotifications, MdSearch } from 'react-icons/md';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard': return 'Dashboard Overview';
      case '/analyzer': return 'Resume Analyzer';
      case '/chat': return 'AI Assistant';
      default: return 'Dashboard';
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.titleContainer}>
        <h1>{getPageTitle()}</h1>
        <p>Welcome back, user.</p>
      </div>

      <div className={styles.actions}>
        <div className={styles.searchBar}>
          <MdSearch className={styles.searchIcon} />
          <input type="text" placeholder="Search..." />
        </div>
        
        <button className={styles.iconBtn}>
          <MdNotifications />
          <span className={styles.badge}></span>
        </button>

        <div className={styles.profile}>
          <img src="https://ui-avatars.com/api/?name=User&background=6366f1&color=fff" alt="Profile" />
        </div>
      </div>
    </header>
  );
};

export default Header;
