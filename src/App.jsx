import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, CircularProgress } from '@mui/material';
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

  useEffect(() => {
    const loadModelData = async () => {
      try {
        const response = await fetch('/api/model-data');
        const data = await response.json();
        setModelData(data);
      } catch (error) {
        console.error('Error loading model data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadModelData();
  }, []);

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
        ) : (
          <ModelViewer modelData={modelData} />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default App;
