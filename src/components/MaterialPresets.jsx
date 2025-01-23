import React from 'react';
import { 
  Box, 
  Button, 
  Typography,
  Grid 
} from '@mui/material';

const MATERIAL_PRESETS = {
  concrete: {
    name: 'Concrete',
    color: { r: 169, g: 169, b: 169, a: 1 },
    defaultCost: 150,
    texture: '/textures/concrete.jpg'
  },
  steel: {
    name: 'Steel',
    color: { r: 192, g: 192, b: 192, a: 1 },
    defaultCost: 300,
    texture: '/textures/metal.jpg'
  },
  glass: {
    name: 'Glass',
    color: { r: 255, g: 255, b: 255, a: 0.5 },
    defaultCost: 200,
    texture: '/textures/glass.jpg'
  },
  brick: {
    name: 'Brick',
    color: { r: 178, g: 34, b: 34, a: 1 },
    defaultCost: 180,
    texture: '/textures/brick.jpg'
  },
  wood: {
    name: 'Wood',
    color: { r: 139, g: 69, b: 19, a: 1 },
    defaultCost: 120,
    texture: '/textures/wood.jpg'
  },
  drywall: {
    name: 'Drywall',
    color: { r: 245, g: 245, b: 245, a: 1 },
    defaultCost: 80,
    texture: '/textures/drywall.jpg'
  },
  marble: {
    name: 'Marble',
    color: { r: 255, g: 251, b: 250, a: 1 },
    defaultCost: 350,
    texture: '/textures/marble.jpg'
  },
  granite: {
    name: 'Granite',
    color: { r: 105, g: 105, b: 105, a: 1 },
    defaultCost: 280,
    texture: '/textures/granite.jpg'
  },
  aluminum: {
    name: 'Aluminum',
    color: { r: 211, g: 211, b: 211, a: 1 },
    defaultCost: 250,
    texture: '/textures/aluminum.jpg'
  },
  ceramic: {
    name: 'Ceramic',
    color: { r: 220, g: 220, b: 220, a: 1 },
    defaultCost: 160,
    texture: '/textures/ceramic.jpg'
  },
  plaster: {
    name: 'Plaster',
    color: { r: 245, g: 245, b: 245, a: 1 },
    defaultCost: 90,
    texture: '/textures/plaster.jpg'
  },
  vinyl: {
    name: 'Vinyl',
    color: { r: 240, g: 240, b: 240, a: 1 },
    defaultCost: 70,
    texture: '/textures/vinyl.jpg'
  }
};

const MaterialPresets = ({ onPresetSelect }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Construction Materials
      </Typography>
      <Grid container spacing={1}>
        {Object.entries(MATERIAL_PRESETS).map(([key, preset]) => (
          <Grid item xs={4} sm={3} md={2} key={key}>
            <Button 
              variant="outlined"
              onClick={() => onPresetSelect(preset)}
              sx={{
                width: '100%',
                height: '70px',
                backgroundColor: `rgba(${preset.color.r}, ${preset.color.g}, ${preset.color.b}, ${preset.color.a})`,
                '&:hover': {
                  backgroundColor: `rgba(${preset.color.r}, ${preset.color.g}, ${preset.color.b}, ${preset.color.a * 0.9})`
                },
                display: 'flex',
                flexDirection: 'column',
                padding: '8px',
                border: '1px solid rgba(0, 0, 0, 0.23)',
                borderRadius: '4px'
              }}
            >
              <Typography variant="subtitle2" sx={{ color: '#000', fontWeight: 'bold' }}>
                {preset.name}
              </Typography>
              <Typography variant="caption" sx={{ color: '#666' }}>
                ${preset.defaultCost}/m²
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MaterialPresets;
