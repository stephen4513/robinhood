// components/buttons/LogoutBtn.js
import React from 'react';
import { Button } from '@mui/material';
import styles from './logoutBtn.module.css';

const LogoutBtn = ({ handleLogout }) => {
  return (
    <Button
      variant="contained"
      onClick={handleLogout}
      className={styles.logoutButton}
    >
      Logout
    </Button>
  );
};

export default LogoutBtn;
