import React from 'react';
import { Box, Paper, Slider, Typography, IconButton } from '@mui/material';
import { ZoomIn, ZoomOut, Refresh, Palette } from '@mui/icons-material';

const ModelControls = ({ onZoom, onReset, onMaterialEdit }) => {
  return (
    <Paper 
      sx={{ 
        position: 'absolute', 
        top: 20, 
        right: 20, 
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <Box>
        <Typography gutterBottom>Zoom</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={() => onZoom(-1)}>
            <ZoomOut />
          </IconButton>
          <Slider
            defaultValue={1}
            min={0.1}
            max={2}
            step={0.1}
            onChange={(_, value) => onZoom(value)}
          />
          <IconButton onClick={() => onZoom(1)}>
            <ZoomIn />
          </IconButton>
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton onClick={onReset} title="Reset View">
          <Refresh />
        </IconButton>
        <IconButton onClick={onMaterialEdit} title="Edit Materials">
          <Palette />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ModelControls;
