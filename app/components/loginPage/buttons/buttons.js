import React from 'react';
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import styles from './buttons.module.css';

const Buttons = ({ handleEmailLogin, handleGoogleLogin }) => {
  return (
    <Box className={styles.buttonContainer}>
      <Button className={styles.button} variant="contained" onClick={handleEmailLogin}>
        Login
      </Button>
      <Button className={styles.button} variant="contained" onClick={handleGoogleLogin}>
        Login with Google
      </Button>
      <Button className={styles.button} component={Link} href="/register" variant="contained">
        Register
      </Button>
    </Box>
  );
};

export default Buttons;