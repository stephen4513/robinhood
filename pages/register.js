// pages/register.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../app/firebase';
import ContentRegister from '../app/components/registerPage/contentRegister';
import styles from './register.module.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/chatbot');
    } catch (error) {
      setError('Failed to register. Please try again.');
      console.error('Error during registration:', error);
    }
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <Container className={styles.container} maxWidth={false}>
      <ContentRegister
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        handleRegister={handleRegister}
        handleLogin={handleLogin}
      />
    </Container>
  );
};

export default RegisterPage;