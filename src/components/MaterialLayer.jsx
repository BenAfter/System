import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  Button,
  TextField
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const MaterialLayer = ({ onLayerUpdate }) => {
  const [layers, setLayers] = useState([]);

  const addLayer = () => {
    const newLayer = {
      id: Date.now(),
      material: '',
      thickness: 0
    };
    setLayers([...layers, newLayer]);
  };

  const updateLayer = (layerId, field, value) => {
    const updatedLayers = layers.map(layer => 
      layer.id === layerId ? { ...layer, [field]: value } : layer
    );
    setLayers(updatedLayers);
    onLayerUpdate(updatedLayers);
  };

  const removeLayer = (layerId) => {
    const updatedLayers = layers.filter(layer => layer.id !== layerId);
    setLayers(updatedLayers);
    onLayerUpdate(updatedLayers);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Material Layers</Typography>
        <IconButton onClick={addLayer} color="primary">
          <Add />
        </IconButton>
      </Box>

      <List>
        {layers.map((layer, index) => (
          <ListItem key={layer.id} sx={{ gap: 2 }}>
            <TextField
              label="Material"
              value={layer.material}
              onChange={(e) => updateLayer(layer.id, 'material', e.target.value)}
              size="small"
            />
            <TextField
              label="Thickness (mm)"
              type="number"
              value={layer.thickness}
              onChange={(e) => updateLayer(layer.id, 'thickness', e.target.value)}
              size="small"
            />
            <IconButton onClick={() => removeLayer(layer.id)} color="error">
              <Remove />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Typography variant="body2" sx={{ mt: 1 }}>
        Total Thickness: {layers.reduce((sum, layer) => sum + Number(layer.thickness), 0)}mm
      </Typography>
    </Box>
  );
};

export default MaterialLayer;
