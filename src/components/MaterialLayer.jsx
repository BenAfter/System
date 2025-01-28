import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  TextField,
  List,
  ListItem,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const MaterialLayer = ({ onLayerUpdate, initialLayers = [] }) => {
  const [layers, setLayers] = useState(initialLayers);

  const handleAddLayer = () => {
    const newLayer = {
      material: 'wood',
      thickness: 1,
      cost: 0
    };
    const updatedLayers = [...layers, newLayer];
    setLayers(updatedLayers);
    onLayerUpdate(updatedLayers);
  };

  const handleRemoveLayer = (index) => {
    const updatedLayers = layers.filter((_, i) => i !== index);
    setLayers(updatedLayers);
    onLayerUpdate(updatedLayers);
  };

  const handleLayerChange = (index, field, value) => {
    const updatedLayers = layers.map((layer, i) => {
      if (i === index) {
        return { ...layer, [field]: value };
      }
      return layer;
    });
    setLayers(updatedLayers);
    onLayerUpdate(updatedLayers);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="subtitle1">Material Layers</Typography>
        <Button
          startIcon={<Add />}
          onClick={handleAddLayer}
          variant="outlined"
          size="small"
        >
          Add Layer
        </Button>
      </Box>

      <List>
        {layers.map((layer, index) => (
          <ListItem
            key={index}
            sx={{
              display: 'flex',
              gap: 2,
              py: 1,
              bgcolor: 'background.paper',
              borderRadius: 1,
              mb: 1
            }}
          >
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Material</InputLabel>
              <Select
                value={layer.material}
                label="Material"
                onChange={(e) => handleLayerChange(index, 'material', e.target.value)}
              >
                <MenuItem value="wood">Wood</MenuItem>
                <MenuItem value="metal">Metal</MenuItem>
                <MenuItem value="plastic">Plastic</MenuItem>
                <MenuItem value="glass">Glass</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Thickness (mm)"
              type="number"
              size="small"
              value={layer.thickness}
              onChange={(e) => handleLayerChange(index, 'thickness', parseFloat(e.target.value))}
              sx={{ width: 120 }}
            />

            <TextField
              label="Cost ($/m³)"
              type="number"
              size="small"
              value={layer.cost}
              onChange={(e) => handleLayerChange(index, 'cost', parseFloat(e.target.value))}
              sx={{ width: 120 }}
            />

            <IconButton 
              onClick={() => handleRemoveLayer(index)}
              color="error"
              size="small"
            >
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MaterialLayer;
