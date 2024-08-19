import React from 'react';
import { Box, Modal, Typography, Button } from '@mui/material';
import styles from './popup.module.css';

const Popup = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="welcome-modal-title"
      aria-describedby="welcome-modal-description"
    >
      <Box className={styles.modalContent}>
        <Typography id="welcome-modal-title" variant="h6" component="h2" className={styles.textTitle}>
          Welcome to Robinhood.ai
        </Typography>
        <Typography id="welcome-modal-description" className={styles.text}>
          This chatbot is meant to give you financial advice on your day-to-day decisions.
        </Typography>
        <Typography id="welcome-modal-description" className={styles.text}>
          To ask for advice use keyword &#39;ADVICE&#39; in the beginning of your query. Ex. ADVICE - ...
        </Typography>
        <Typography id="welcome-modal-description" className={styles.text}>
          It can also fetch company data using the ticker symbol and keyword &#39;MARKET&#39;. Ex. MARKET - AAPL
        </Typography>
        <Button onClick={handleClose} className={styles.closeButton}>
          Got it!
        </Button>
      </Box>
    </Modal>
  );
};

export default Popup;
