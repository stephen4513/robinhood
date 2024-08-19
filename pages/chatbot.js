// pages/chatbot.js
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../app/firebase'; // Adjust path if necessary
import ContentChatbot from '../app/components/chatbotPage/contentChatbot'; // Import the new component
import { Container } from '@mui/material';
import styles from './chatbot.module.css';

const ChatbotPage = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <Container className={styles.container} maxWidth={false}>
      <ContentChatbot handleLogout={handleLogout} />
    </Container>
  );
};

export default ChatbotPage;
