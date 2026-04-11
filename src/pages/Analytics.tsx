import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import styles from './Analytics.module.scss';
import { MdTrendingUp } from 'react-icons/md';

const performanceData = [
  { name: 'Interview 1', score: 45 },
  { name: 'Interview 2', score: 55 },
  { name: 'Interview 3', score: 62 },
  { name: 'Interview 4', score: 78 },
  { name: 'Interview 5', score: 85 },
];

const categoryData = [
  { name: 'React', score: 80 },
  { name: 'Node.js', score: 65 },
  { name: 'System Design', score: 40 },
  { name: 'Algorithms', score: 60 },
  { name: 'Soft Skills', score: 90 },
];

const weaknessData = [
  { name: 'Strong', value: 45 },
  { name: 'Average', value: 35 },
  { name: 'Needs Improvement', value: 20 },
];

const COLORS = ['#2ecc71', '#f39c12', '#e74c3c'];

const Analytics: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>User Improvement Analytics</h1>
        <p>Track your interview performance and identify areas for growth.</p>
      </header>

      <div className={styles.dashboardGrid}>
        
        {/* Line Chart: Overall Performance */}
        <div className={styles.chartCard} style={{ gridColumn: '1 / -1' }}>
          <div className={styles.cardHeader}>
            <MdTrendingUp className={styles.icon} />
            <h2>Overall Progress</h2>
          </div>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="name" stroke="var(--text-color)" />
                <YAxis stroke="var(--text-color)" />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}
                />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="var(--primary-color)" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Category Performance */}
        <div className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <h2>Skills Breakdown</h2>
          </div>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={300}>
               <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="name" stroke="var(--text-color)" />
                  <YAxis stroke="var(--text-color)" />
                  <RechartsTooltip 
                    cursor={{fill: 'rgba(255, 255, 255, 0.1)'}} 
                    contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)'}} 
                  />
                  <Legend />
                  <Bar dataKey="score" fill="var(--secondary-color)" radius={[4, 4, 0, 0]} />
               </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Strengths vs Weaknesses */}
        <div className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <h2>Proficiency Overview</h2>
          </div>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={weaknessData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                >
                  {weaknessData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ backgroundColor: 'var(--card-bg)', border: 'none'}} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;
