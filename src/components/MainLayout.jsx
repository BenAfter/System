import React from 'react';
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Cost Estimator</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} sx={{ flexGrow: 1, mt: 2 }}>
        {children}
      </Container>
    </Box>
  );
};

export default MainLayout;
