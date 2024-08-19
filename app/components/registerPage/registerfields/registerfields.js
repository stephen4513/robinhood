// app/components/registerPage/registerFields/RegisterFields.js
import React from 'react';
import { Box, TextField } from '@mui/material';
import styles from './registerfields.module.css';

const RegisterFields = ({ email, setEmail, password, setPassword }) => {
  return (
    <Box className={styles.textFieldContainer} margin={'40px'}>
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#333',
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
            color: 'white',
          },
        }}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#333',
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
            color: 'white',
          },
        }}
      />
    </Box>
  );
};

export default RegisterFields;