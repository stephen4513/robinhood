// components/modals/Feedback.js
import React, { useState } from 'react';
import { Box, Button, Modal, Typography, TextField, Rating } from '@mui/material';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../../../firebase'; // Import Firestore instance
import styles from './feedback.module.css';

const Feedback = () => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFeedbackSubmit = async () => {
    try {
      await addDoc(collection(db, 'feedbacks'), {
        rating,
        text: feedback,
        timestamp: new Date(),
      });
      console.log('Feedback submitted:', { rating, feedback });
  
      // Reset inputs
      setRating(0);
      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpen}
        className={styles.feedbackButton}
      >
        Give Feedback
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box className={styles.modalContent}>
          <Typography variant="h6" gutterBottom>
            Rate Our Service
          </Typography>
          <Rating
            name="service-rating"
            value={rating}
            precision={0.5}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            sx={{
              '& .MuiRating-icon': {
                color: 'white',
              },
              '& .MuiRating-iconFilled': {
                color: 'rgba(18, 131, 48, 0.7)',
              },
              '& .MuiRating-iconHover': {
                color: 'rgba(18, 131, 48, 0.7)',
              },
            }}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Your feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className={styles.feedbackInput}
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleFeedbackSubmit}
            className={styles.submitButton} 
          >
            Submit Feedback
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Feedback;
