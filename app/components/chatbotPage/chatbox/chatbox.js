// components/chatbox/Chatbox.js
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db, auth } from '../../../firebase'; // Ensure your Firebase setup exports db and auth
import Messages from './messages/messages';
import Input from './input/input';
import styles from './chatbox.module.css';

const Chatbox = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const user = auth.currentUser;
      if (user) {
        const chatHistoryRef = collection(db, 'users', user.uid, 'chatHistory');
        const q = query(chatHistoryRef, orderBy('timestamp', 'asc'));
        const querySnapshot = await getDocs(q);

        const fetchedMessages = querySnapshot.docs.map(doc => doc.data());
        setMessages(fetchedMessages);
      }
    };

    fetchMessages();
  }, []);

  return (
    <Box className={styles.chatContainer}>
      <Box className={styles.backgroundTextContainer}>
          <Typography className={styles.backgroundText}>
            Robinhood.ai
          </Typography>
          <Image src="/robinhood.png" alt="Robinhood" className={styles.logo} width={50} height={50}/>
      </Box>
      <Messages messages={messages} />
      <Input messages={messages} setMessages={setMessages} />
    </Box>
  );
};

export default Chatbox;
