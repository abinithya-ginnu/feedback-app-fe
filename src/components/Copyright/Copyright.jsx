import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link style={{textDecoration: 'none', color: 'white'}} color="inherit" target='_blank' to={"https://www.linkedin.com/in/abinithyasa/"}>Abinithya</Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Copyright
