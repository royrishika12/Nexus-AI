
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import ChatUI from './pages/ChatUI';
import MockInterviews from './pages/MockInterviews';
import InterviewSession from './pages/InterviewSession';
import Analytics from './pages/Analytics';
import HelperChatbot from './components/HelperChatbot/HelperChatbot';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="page-wrapper">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analyzer" element={<ResumeAnalyzer />} />
              <Route path="/chat" element={<ChatUI />} />
              <Route path="/interviews" element={<MockInterviews />} />
              <Route path="/interview-session/:id" element={<InterviewSession />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </div>
        </div>
        <HelperChatbot />
      </div>
    </BrowserRouter>
  );
}

export default App;
