import React from 'react';
import { Box, Button } from '@mui/material';
import styles from './buttons.module.css';

const Buttons = ({ handleRegister, handleLogin }) => {
  return (
    <Box className={styles.buttonContainer}>
      <Button className={styles.button} variant="contained" color="primary" onClick={handleRegister}>
        Register
      </Button>
      <Button className={styles.button} variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default Buttons;