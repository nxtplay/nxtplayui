// src/components/LoginPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        console.log(result);
        navigate('/videos'); // Navigate to VideoPage after successful login
      }).catch((error) => {
        // Handle Errors here.
        console.error("Error during Google sign-in:", error.message);
      });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
    </div>
  );
};

export default LoginPage;
