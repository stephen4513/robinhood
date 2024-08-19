// index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import  { Container, Box, Typography } from '@mui/material';
import styles from './index.module.css';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, [router]);

  return (
    <Container className={styles.container} maxWidth={false}>
      <Typography className={styles.title}>Loading...</Typography>
    </Container> 
  );
};

export default HomePage;