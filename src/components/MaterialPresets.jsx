import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton
} from '@mui/material';
import {
  Wood,
  Opacity,
  Window,
  Construction,
  Palette
} from '@mui/icons-material';

const MATERIAL_PRESETS = [
  {
    name: 'Solid Wood',
    icon: <Wood />,
    color: { r: 139, g: 69, b: 19, a: 1 },
    defaultCost: 800,
    layers: [
      { material: 'wood', thickness: 18, cost: 800 }
    ]
  },
  {
    name: 'Glass Panel',
    icon: <Window />,
    color: { r: 200, g: 200, b: 255, a: 0.6 },
    defaultCost: 1200,
    layers: [
      { material: 'glass', thickness: 6, cost: 1200 }
    ]
  },
  {
    name: 'Metal Frame',
    icon: <Construction />,
    color: { r: 192, g: 192, b: 192, a: 1 },
    defaultCost: 1500,
    layers: [
      { material: 'metal', thickness: 2, cost: 1500 }
    ]
  },
  {
    name: 'Composite',
    icon: <Palette />,
    color: { r: 120, g: 120, b: 120, a: 1 },
    defaultCost: 1000,
    layers: [
      { material: 'composite', thickness: 12, cost: 1000 }
    ]
  },
  {
    name: 'Laminate',
    icon: <Opacity />,
    color: { r: 245, g: 245, b: 220, a: 1 },
    defaultCost: 600,
    layers: [
      { material: 'wood', thickness: 16, cost: 400 },
      { material: 'plastic', thickness: 1, cost: 200 }
    ]
  }
];

const MaterialPresets = ({ onPresetSelect }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {MATERIAL_PRESETS.map((preset) => (
          <Grid item xs={12} sm={6} md={4} key={preset.name}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover' }
              }}
              onClick={() => onPresetSelect(preset)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton size="small" color="primary">
                    {preset.icon}
                  </IconButton>
                  <Typography variant="subtitle1">
                    {preset.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Base cost: ${preset.defaultCost}/m³
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MaterialPresets;
