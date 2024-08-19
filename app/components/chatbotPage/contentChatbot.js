// components/ContentChatbot.js
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Chatbox from './chatbox/chatbox';
import RatingsCarousel from './ratings/ratings';
import Popup from './popup/popup';
import Feedback from './bottomchat/feedback/feedback';
import LogoutBtn from './bottomchat/logout/logoutBtn';
import styles from './contentChatbot.module.css';

const ContentChatbot = ({ handleLogout }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Box className={styles.mainContainer}>
      <Popup open={open} handleClose={handleClose} />
      <Box className={styles.chatContainer}>
        <Chatbox handleLogout={handleLogout}/>
      </Box>
      <Box className={styles.rightContainer}>
        <Box className={styles.carouselContainer}>
          <RatingsCarousel />
        </Box>
        <Box className={styles.buttonsContainer}> 
          <Feedback />
          <LogoutBtn handleLogout={handleLogout} />
        </Box>
      </Box>
    </Box>
  );
};

export default ContentChatbot;
