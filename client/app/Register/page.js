// Register.js
import React from 'react';
import AuthPage from '../components/PageAuth'
import Header from '../components/Header';

const Register = () => {
    return (
        <main>
            <Header />
            <AuthPage isRegister={true} />
        </main>
    );
};

export default Register;
