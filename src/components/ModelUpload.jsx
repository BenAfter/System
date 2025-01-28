import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Alert
} from '@mui/material';
import { CloudUpload, Check } from '@mui/icons-material';

const ModelUpload = ({ open, onClose, onUpload }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'model/gltf-binary' || selectedFile.name.endsWith('.glb')) {
        setFile(selectedFile);
        setError(null);
      } else {
        setError('Please upload a valid GLB file');
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('model', file);

      await onUpload(formData);
      setUploading(false);
      onClose();
    } catch (err) {
      setError('Upload failed. Please try again.');
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Upload 3D Model</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <input
            type="file"
            accept=".glb"
            style={{ display: 'none' }}
            id="model-upload"
            onChange={handleFileSelect}
          />
          <label htmlFor="model-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={file ? <Check /> : <CloudUpload />}
              sx={{ mb: 2 }}
            >
              {file ? 'File Selected' : 'Choose GLB File'}
            </Button>
          </label>

          {file && (
            <Typography variant="body2" color="text.secondary">
              Selected file: {file.name}
            </Typography>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {uploading && (
            <Box sx={{ mt: 2 }}>
              <LinearProgress />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleUpload}
          disabled={!file || uploading}
          variant="contained"
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModelUpload;
