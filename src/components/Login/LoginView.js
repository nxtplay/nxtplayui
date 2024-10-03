// src/components/LoginPage.js
import React, { useState } from 'react'; //"using the state hook"
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword  } from "firebase/auth";
import './LoginView.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate('/dashboard');
      }).catch((error) => {
        console.error("Error during Google sign-in:", error.message);
      });
  };
  
   const handleLogin = () => {
     signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
         navigate('/dashboard');
       }).catch((error) => {
        console.error("Error with email and password sign-in:", error.message);
       });
   };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Log In</h2>
        <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(counter) => setEmail(counter.target.value)}   />
          <input type="password" placeholder="Password" onChange={(counter) => setPassword(counter.target.value)} value={password}  />
          <div className="login-actions">
            <button type="submit" className="login-button">Log In</button>
          </div>
        </form>
        <div className="separator">Or use</div>
        <button className="google-sign-in" onClick={signInWithGoogle}>
          Sign In with Google
        </button>
     </div>
    </div>
  );
};
export default LoginPage;
