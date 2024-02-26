// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCredential.user);
            navigate("/login");
        } catch (error) {
            console.error(error.code, error.message);
        }
    };

    return (
        <main>
            {/* Your form and input fields here */}
        </main>
    );
};

export default Signup;
