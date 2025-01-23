import React, { useState } from 'react';
import { ThemeProvider, createTheme, Box } from '@mui/material';
import ModelUpload from './components/ModelUpload';
import ModelViewer from './components/ModelViewer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#ff4081',
    },
  },
});

function App() {
  const [modelData, setModelData] = useState(null);

  const handleModelUpload = (data) => {
    setModelData(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {!modelData ? (
          <Box sx={{ p: 3 }}>
            <ModelUpload onModelUpload={handleModelUpload} />
          </Box>
        ) : (
          <ModelViewer modelData={modelData} />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
