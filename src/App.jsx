import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, CircularProgress, Alert, Snackbar } from '@mui/material';
import ModelViewer from './components/ModelViewer';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App = () => {
  const [modelData, setModelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadModelData = async () => {
    try {
      const response = await fetch('/api/model-data');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setModelData(data);
      setError(null);
    } catch (error) {
      setError('Failed to load model data. Please try again.');
      console.error('Error loading model data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadModelData();
  }, []);

  const handleRetry = () => {
    setLoading(true);
    loadModelData();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        {loading ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            height: '100%' 
          }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center',
            height: '100%',
            gap: 2
          }}>
            <Alert 
              severity="error" 
              action={
                <Button color="inherit" size="small" onClick={handleRetry}>
                  RETRY
                </Button>
              }
            >
              {error}
            </Alert>
          </Box>
        ) : (
          <ModelViewer modelData={modelData} />
        )}
      </Box>
      
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default App;
