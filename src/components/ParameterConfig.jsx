import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button
} from '@mui/material';

const PART_TYPES = {
  DOOR: 'door',
  SHELF: 'shelf',
  DRAWER: 'drawer',
  FRAME: 'frame',
  PANEL: 'panel',
  CUSTOM: 'custom'
};

const ParameterConfig = ({ selectedPart, onParameterUpdate }) => {
  const [parameters, setParameters] = useState({
    width: '',
    height: '',
    depth: '',
    thickness: '',
    quantity: 1,
    type: PART_TYPES.CUSTOM
  });

  const handleParameterChange = (param, value) => {
    const updatedParameters = {
      ...parameters,
      [param]: value
    };
    setParameters(updatedParameters);
    onParameterUpdate(selectedPart.id, updatedParameters);
  };

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Part Parameters
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Part Type</InputLabel>
          <Select
            value={parameters.type}
            label="Part Type"
            onChange={(e) => handleParameterChange('type', e.target.value)}
          >
            {Object.entries(PART_TYPES).map(([key, value]) => (
              <MenuItem key={value} value={value}>
                {key.charAt(0) + key.slice(1).toLowerCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Width (mm)"
          type="number"
          value={parameters.width}
          onChange={(e) => handleParameterChange('width', e.target.value)}
        />

        <TextField
          label="Height (mm)"
          type="number"
          value={parameters.height}
          onChange={(e) => handleParameterChange('height', e.target.value)}
        />

        <TextField
          label="Depth (mm)"
          type="number"
          value={parameters.depth}
          onChange={(e) => handleParameterChange('depth', e.target.value)}
        />

        <TextField
          label="Thickness (mm)"
          type="number"
          value={parameters.thickness}
          onChange={(e) => handleParameterChange('thickness', e.target.value)}
        />

        <TextField
          label="Quantity"
          type="number"
          value={parameters.quantity}
          onChange={(e) => handleParameterChange('quantity', e.target.value)}
        />

        <Button 
          variant="contained" 
          color="primary"
          onClick={() => onParameterUpdate(selectedPart.id, parameters)}
        >
          Apply Parameters
        </Button>
      </Box>
    </Paper>
  );
};

export default ParameterConfig;
