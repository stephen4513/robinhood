import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase"; // Ensure your Firebase setup exports the Firestore db instance
import styles from "./ratings.module.css";

const RatingsCarousel = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const feedbackRef = collection(db, "feedbacks");
        const q = query(feedbackRef, where("rating", ">=", 3));
        const querySnapshot = await getDocs(q);
        const feedbackData = querySnapshot.docs.map((doc) => doc.data());
        setFeedbacks(feedbackData);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  // Triple the feedbacks to ensure smooth infinite scrolling
  const repeatedFeedbacks = [...feedbacks, ...feedbacks, ...feedbacks];

  return (
    <Box className={styles.carouselContainer}>
      <Box className={styles.logos}>
        <Box className={styles.logosSlide}>
          {repeatedFeedbacks.map((feedback, index) => (
            <Box key={index} className={styles.feedbackCard}>
              <Typography variant="h6">Rating: {feedback.rating} / 5</Typography>
              <Typography variant="body2">{feedback.text}</Typography>
              <Typography variant="caption" className={styles.timestamp}>
                {new Date(feedback.timestamp.toDate()).toLocaleDateString()}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box className={styles.logosSlide}>
          {repeatedFeedbacks.map((feedback, index) => (
            <Box key={index + repeatedFeedbacks.length} className={styles.feedbackCard}>
              <Typography variant="h6">Rating: {feedback.rating} / 5</Typography>
              <Typography variant="body2">{feedback.text}</Typography>
              <Typography variant="caption" className={styles.timestamp}>
                {new Date(feedback.timestamp.toDate()).toLocaleDateString()}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box className={`${styles.gradient} ${styles.gradientLeft}`}></Box>
      <Box className={`${styles.gradient} ${styles.gradientRight}`}></Box>
    </Box>
  );
};

export default RatingsCarousel;
