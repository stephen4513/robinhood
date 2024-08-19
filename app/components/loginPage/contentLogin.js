// app/components/loginPage/ContentLogin.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import LoginFields from './loginFields/loginfields';
import Buttons from './buttons/buttons';
import Footer from '../footer/footer';
import styles from './contentLogin.module.css';

const ContentLogin = ({ email, setEmail, password, setPassword, error, handleEmailLogin, handleGoogleLogin }) => {
  return (
    <>
      <Box className={styles.contentContainer}>
        <Box className={styles.titleContainer}>
          <Typography className={styles.title}>
            Robinhood.ai
          </Typography>
          <Image src="/robinhood.png" alt="Robinhood" className={styles.logo} width={50} height={50}/>
        </Box>
        <LoginFields 
          email={email} 
          setEmail={setEmail} 
          password={password} 
          setPassword={setPassword} 
        />
        {error && <Typography className={styles.error}>{error}</Typography>}
        <Buttons 
          handleEmailLogin={handleEmailLogin} 
          handleGoogleLogin={handleGoogleLogin} 
        />
        <Box className={styles.blurOne}></Box>
        <Box className={styles.blurTwo}></Box>
      </Box>
      <Footer />
    </>
  );
};

export default ContentLogin;
