import React from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Paper
} from '@mui/material';
import {
  ZoomIn,
  ZoomOut,
  RestartAlt,
  Palette,
  SaveAlt
} from '@mui/icons-material';

const ModelControls = ({ onZoom, onReset, onMaterialEdit, onExport }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        position: 'absolute',
        right: 16,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        p: 1
      }}
    >
      <Tooltip title="Zoom In" placement="left">
        <IconButton onClick={() => onZoom(-1)}>
          <ZoomIn />
        </IconButton>
      </Tooltip>

      <Tooltip title="Zoom Out" placement="left">
        <IconButton onClick={() => onZoom(1)}>
          <ZoomOut />
        </IconButton>
      </Tooltip>

      <Tooltip title="Reset View" placement="left">
        <IconButton onClick={onReset}>
          <RestartAlt />
        </IconButton>
      </Tooltip>

      <Box sx={{ my: 1, borderTop: 1, borderColor: 'divider' }} />

      <Tooltip title="Edit Materials" placement="left">
        <IconButton onClick={onMaterialEdit}>
          <Palette />
        </IconButton>
      </Tooltip>

      <Tooltip title="Export" placement="left">
        <IconButton onClick={onExport}>
          <SaveAlt />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default ModelControls;
