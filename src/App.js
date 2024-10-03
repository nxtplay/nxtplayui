
// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home/Home'; // Landing page with sign-in/sign-up options
import LoginPage from './components/Login/LoginView';
import VideoPage from './components/VideoView/VideoView'; // The page that shows after successful login
import DashboardPage from './components/DashBoard/DashBoardView'; // The page that shows after successful login
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  
return (
    <Router>
      <Routes>
        <Route exact path="/" element={isLoggedIn ? <Navigate to="/videos" /> : <Home />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/videos" /> : <LoginPage />} />
        <Route path="/videos" element={!isLoggedIn ? <Navigate to="/" /> : <VideoPage />} />
         <Route path="/dashboard" element={!isLoggedIn ? <Navigate to="/dashboard" /> : <DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
