import React, { useRef, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import styles from './messages.module.css';

const Messages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Box className={styles.messagesContainer}>
      {messages.map((msg, index) => (
        <Typography
          key={index}
          className={msg.sender === "user" ? styles.userMessage : styles.botMessage}
        >
          {msg.text}
        </Typography>
      ))}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default Messages;
