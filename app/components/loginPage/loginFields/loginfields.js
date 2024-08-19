import React from 'react';
import { TextField } from '@mui/material';
import styles from './loginfields.module.css';

const LoginFields = ({ email, setEmail, password, setPassword }) => {
  return (
    <>
      <TextField
        className={styles.textField} 
        label="Email"
        type="email"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
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
            color: '#ccc', 
            '&::placeholder': {
              color: '#ccc', 
              fontFamily: 'Courier New, monospace', 
              opacity: 1, 
            },
          },
        }}
      />
      <TextField
        className={styles.textField}
        label="Password"
        type="password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
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
            color: '#ccc',
            '&::placeholder': {
              color: '#ccc', 
              fontFamily: 'Courier New, monospace',
              opacity: 1,
            },
          },
        }}
      />
    </>
  );
};

export default LoginFields;
