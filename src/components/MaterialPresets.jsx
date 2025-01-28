import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton
} from '@mui/material';
import { Add } from '@mui/icons-material';

const presets = [
  {
    name: 'Solid Wood',
    color: { r: 139, g: 69, b: 19, a: 1 },
    defaultCost: 800,
    layers: [
      { material: 'wood', thickness: 18, cost: 800 }
    ]
  },
  {
    name: 'Laminated Board',
    color: { r: 210, g: 180, b: 140, a: 1 },
    defaultCost: 400,
    layers: [
      { material: 'particle_board', thickness: 16, cost: 300 },
      { material: 'laminate', thickness: 1, cost: 100 }
    ]
  },
  {
    name: 'Metal Frame',
    color: { r: 192, g: 192, b: 192, a: 1 },
    defaultCost: 1200,
    layers: [
      { material: 'aluminum', thickness: 2, cost: 1200 }
    ]
  },
  {
    name: 'Glass Panel',
    color: { r: 200, g: 200, b: 255, a: 0.6 },
    defaultCost: 1500,
    layers: [
      { material: 'glass', thickness: 6, cost: 1500 }
    ]
  }
];

const MaterialPresets = ({ onPresetSelect }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Material Presets
      </Typography>
      
      <Grid container spacing={2}>
        {presets.map((preset) => (
          <Grid item xs={12} sm={6} md={4} key={preset.name}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                '&:hover': { boxShadow: 6 }
              }}
              onClick={() => onPresetSelect(preset)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      bgcolor: `rgba(${preset.color.r}, ${preset.color.g}, ${preset.color.b}, ${preset.color.a})`
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1">
                      {preset.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Base Cost: ${preset.defaultCost}/m³
                    </Typography>
                  </Box>
                  <IconButton size="small">
                    <Add />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MaterialPresets;
