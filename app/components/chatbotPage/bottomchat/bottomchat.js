// components/chatbox/BottomChat.js
import React from 'react';
import { Box } from '@mui/material';
import LogoutBtn from './logout/logoutBtn';
import DeleteBtn from './delete/deleteBtn';
import Feedback from './feedback/feedback';
import styles from './bottomchat.module.css';

const BottomChat = ({ handleLogout }) => {
  return (
    <Box className={styles.bottomContainer}>
      <LogoutBtn handleLogout={handleLogout} />
      <DeleteBtn />
      <Feedback />
    </Box>
  );
};

export default BottomChat;
