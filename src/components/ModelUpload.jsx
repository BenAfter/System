import React, { useState } from 'react';
import { Box, Paper, Typography, Button, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { parseSketchUpFile } from '../services/ModelParser';

const ModelUpload = ({ onModelUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFile(files[0]);
    }
  };

  const handleFile = async (file) => {
    const supportedFormats = ['.obj', '.skp'];
    const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
    
    if (supportedFormats.includes(fileExtension)) {
      setIsLoading(true);
      try {
        if (fileExtension === '.skp') {
          const modelData = await parseSketchUpFile(file);
          onModelUpload(modelData);
        } else {
          onModelUpload(file);
        }
      } catch (error) {
        console.error('Error parsing file:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        textAlign: 'center',
        backgroundColor: isDragging ? '#e3f2fd' : 'white',
        border: '2px dashed',
        borderColor: isDragging ? '#2196f3' : '#ccc',
        transition: 'all 0.3s ease',
        position: 'relative',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isLoading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CircularProgress sx={{ mb: 2 }} />
          <Typography>Processing file...</Typography>
        </Box>
      ) : (
        <>
          <CloudUploadIcon sx={{ fontSize: 48, color: '#2196f3', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Drag & Drop Model Here
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Supports .obj, .skp files
          </Typography>
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2 }}
          >
            Select File
            <input
              type="file"
              hidden
              accept=".obj,.skp"
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </Button>
        </>
      )}
    </Paper>
  );
};

export default ModelUpload;
