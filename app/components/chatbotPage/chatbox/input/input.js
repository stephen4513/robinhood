// components/chatbox/Input.js
import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../../../../firebase';
import DeleteBtn from '../../bottomchat/delete/deleteBtn';
import styles from './input.module.css';

const Input = ({ messages, setMessages }) => {
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const user = auth.currentUser;
    if (!user) {
      console.error("No user is logged in.");
      return;
    }

    const newMessage = { sender: "user", text: input, timestamp: new Date() };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setInput("");

    try {
      const chatHistoryRef = collection(db, 'users', user.uid, 'chatHistory');
      await addDoc(chatHistoryRef, newMessage);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      const botMessage = { sender: "bot", text: data.botMessage, timestamp: new Date() };

      await addDoc(chatHistoryRef, botMessage);

      setMessages([...newMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Box className={styles.inputContainer}>
      <TextField
        className={styles.inputBox}
        placeholder="Type a message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(18, 131, 48, 0.7)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(18, 131, 48, 0.7)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'rgb(4, 143, 34)',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'white',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'rgb(4, 143, 34)',
          },
          '& .MuiInputBase-input': {
            color: '#ccc',
            '&::placeholder': {
              color: 'white',
              fontFamily: 'Courier New, monospace',
              opacity: 1,
            },
          },
        }}
      />
      <Button onClick={handleSendMessage} className={styles.sendButton}>
        Send
      </Button>
      <DeleteBtn />
    </Box>
  );
};

export default Input;
