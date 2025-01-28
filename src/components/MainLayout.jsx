import React from 'react';
import { Box, Container, AppBar, Toolbar, Typography } from '@mui/material';
import ModelControls from './ModelControls';

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            3D Cost Estimator
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ 
        flex: 1, 
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#f5f5f5'
      }}>
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
