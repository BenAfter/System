import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  IconButton,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

const MATERIAL_TYPES = {
  WOOD: 'wood',
  METAL: 'metal',
  PLASTIC: 'plastic',
  GLASS: 'glass',
  COMPOSITE: 'composite'
};

const MaterialLayer = ({ onLayerUpdate }) => {
  const [layers, setLayers] = useState([]);

  const handleAddLayer = () => {
    const newLayer = {
      id: Date.now(),
      material: MATERIAL_TYPES.WOOD,
      thickness: 1,
      cost: 0
    };
    const updatedLayers = [...layers, newLayer];
    setLayers(updatedLayers);
    onLayerUpdate(updatedLayers);
  };

  const handleRemoveLayer = (layerId) => {
    const updatedLayers = layers.filter(layer => layer.id !== layerId);
    setLayers(updatedLayers);
    onLayerUpdate(updatedLayers);
  };

  const handleLayerChange = (layerId, field, value) => {
    const updatedLayers = layers.map(layer => {
      if (layer.id === layerId) {
        return { ...layer, [field]: value };
      }
      return layer;
    });
    setLayers(updatedLayers);
    onLayerUpdate(updatedLayers);
  };

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        Material Layers
      </Typography>
      <List>
        {layers.map((layer, index) => (
          <ListItem key={layer.id} sx={{ gap: 2 }}>
            <Select
              size="small"
              value={layer.material}
              onChange={(e) => handleLayerChange(layer.id, 'material', e.target.value)}
            >
              {Object.entries(MATERIAL_TYPES).map(([key, value]) => (
                <MenuItem key={value} value={value}>
                  {key.charAt(0) + key.slice(1).toLowerCase()}
                </MenuItem>
              ))}
            </Select>
            <TextField
              size="small"
              type="number"
              label="Thickness (mm)"
              value={layer.thickness}
              onChange={(e) => handleLayerChange(layer.id, 'thickness', parseFloat(e.target.value))}
              sx={{ width: 150 }}
            />
            <TextField
              size="small"
              type="number"
              label="Cost per m³"
              value={layer.cost}
              onChange={(e) => handleLayerChange(layer.id, 'cost', parseFloat(e.target.value))}
              sx={{ width: 150 }}
            />
            <IconButton onClick={() => handleRemoveLayer(layer.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Button
        startIcon={<AddIcon />}
        onClick={handleAddLayer}
        variant="outlined"
        sx={{ mt: 2 }}
      >
        Add Layer
      </Button>
    </Box>
  );
};

export default MaterialLayer;
