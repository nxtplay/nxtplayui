
// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home'; // Landing page with sign-in/sign-up options
import LoginPage from './components/LoginView';
import Signup from './components/Signup';
import VideoPage from './components/VideoView'; // The page that shows after successful login
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
        <Route path="/signup" element={isLoggedIn ? <Navigate to="/videos" /> : <Signup />} />
        <Route path="/videos" element={!isLoggedIn ? <Navigate to="/" /> : <VideoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
