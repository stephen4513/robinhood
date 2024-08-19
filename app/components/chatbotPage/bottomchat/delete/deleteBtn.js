import React from 'react';
import { Button } from '@mui/material';
import { collection, getDocs, query, writeBatch } from "firebase/firestore";
import { db, auth } from '../../../../firebase'; // Ensure you import auth instance
import styles from './deleteBtn.module.css';

const DeleteBtn = () => {
  const handleDeleteHistory = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const chatHistoryRef = collection(db, 'users', user.uid, 'chatHistory');
        const q = query(chatHistoryRef);
        const querySnapshot = await getDocs(q);

        const batch = writeBatch(db); // Use writeBatch to create a batch
        querySnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });

        await batch.commit();
        console.log('Chat history deleted successfully.');
      }
    } catch (error) {
      console.error('Error deleting chat history:', error);
    }
  };

  return (
    <Button
      variant="contained"
      onClick={handleDeleteHistory}
      className={styles.deleteButton}
    >
      Delete History
    </Button>
  );
};

export default DeleteBtn;
