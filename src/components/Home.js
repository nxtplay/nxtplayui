// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Our App</h1>
      <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export default Home;

