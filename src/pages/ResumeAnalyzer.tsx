import React, { useState } from 'react';
import { MdCloudUpload, MdInsertDriveFile, MdCheckCircle, MdErrorOutline } from 'react-icons/md';
import styles from './ResumeAnalyzer.module.scss';

const ResumeAnalyzer: React.FC = () => {
  const [, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<boolean>(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    setFile(file);
    setIsAnalyzing(true);
    // Mock analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setResults(true);
    }, 2500);
  };

  return (
    <div className={styles.container}>
      {!results && !isAnalyzing && (
        <div 
          className={styles.uploadZone}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className={styles.uploadContent}>
            <MdCloudUpload className={styles.uploadIcon} />
            <h2>Upload your Resume</h2>
            <p>Drag and drop your PDF or DOCX file here, or click to browse.</p>
            <label className={styles.browseBtn}>
              Browse Files
              <input 
                type="file" 
                accept=".pdf,.docx" 
                onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])} 
                hidden 
              />
            </label>
          </div>
        </div>
      )}

      {isAnalyzing && (
        <div className={styles.analyzingZone}>
          <div className={styles.scannerContainer}>
            <MdInsertDriveFile className={styles.fileIcon} />
            <div className={styles.scannerLine}></div>
          </div>
          <h3>Analyzing Resume...</h3>
          <p>Extracting skills, experience, and matching with industry benchmarks.</p>
        </div>
      )}

      {results && (
        <div className={styles.resultsZone}>
          <div className={styles.scoreHeader}>
            <div className={styles.scoreCircle}>
              <svg viewBox="0 0 36 36" className={styles.circularChart}>
                <path className={styles.circleBg}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path className={styles.circle}
                  strokeDasharray="85, 100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className={styles.percentage}>85%</text>
              </svg>
            </div>
            <div className={styles.scoreText}>
              <h2>Great Candidate!</h2>
              <p>Your resume scores high on ATS compatibility and skill matching.</p>
              <button className={styles.resetBtn} onClick={() => { setResults(false); setFile(null); }}>Analyze Another</button>
            </div>
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.detailCard}>
              <h3><MdCheckCircle className={styles.successIcon} /> Strengths</h3>
              <ul>
                <li>Strong action verbs used in experience.</li>
                <li>Clear and readable formatting.</li>
                <li>Excellent match for React and TypeScript keywords.</li>
              </ul>
            </div>
            
            <div className={styles.detailCard}>
              <h3><MdErrorOutline className={styles.warningIcon} /> Suggestions</h3>
              <ul>
                <li>Missing quantitative metrics in recent role.</li>
                <li>Consider adding 'GraphQL' as it is highly requested.</li>
                <li>Summary section is slightly too long.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
