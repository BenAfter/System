import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import {
  ZoomIn,
  ZoomOut,
  RestartAlt,
  Palette,
  SaveAlt,
  Upload
} from '@mui/icons-material';

const ModelControls = ({ onZoom, onReset, onMaterialEdit, onSave, onLoad }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        right: 16,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        bgcolor: 'background.paper',
        p: 1,
        borderRadius: 1,
        boxShadow: 2
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

      <Tooltip title="Edit Materials" placement="left">
        <IconButton onClick={onMaterialEdit}>
          <Palette />
        </IconButton>
      </Tooltip>

      <Tooltip title="Save Configuration" placement="left">
        <IconButton onClick={onSave}>
          <SaveAlt />
        </IconButton>
      </Tooltip>

      <Tooltip title="Load Configuration" placement="left">
        <IconButton onClick={onLoad}>
          <Upload />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ModelControls;
