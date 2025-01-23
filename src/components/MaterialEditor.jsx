import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  TextField,
  Typography,
  Divider
} from '@mui/material';
import { Close, Calculate } from '@mui/icons-material';
import { SketchPicker } from 'react-color';
import MaterialPresets from './MaterialPresets';

const MaterialEditor = ({ open, onClose, materials, onMaterialUpdate }) => {
  const [costs, setCosts] = useState({});

  const handleCostChange = (materialName, cost) => {
    const newCost = parseFloat(cost);
    setCosts(prev => ({
      ...prev,
      [materialName]: newCost
    }));
    
    onMaterialUpdate(materialName, { cost: newCost });
  };

  const handlePresetSelect = (materialName, preset) => {
    onMaterialUpdate(materialName, {
      color: preset.color,
      cost: preset.defaultCost
    });
    setCosts(prev => ({
      ...prev,
      [materialName]: preset.defaultCost
    }));
  };

  const calculateTotalCost = () => {
    return materials.reduce((total, material) => {
      const costPerUnit = costs[material.name] || 0;
      const area = material.area || 0;
      return total + (costPerUnit * area);
    }, 0);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Material Cost Estimation
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <MaterialPresets onPresetSelect={(preset) => handlePresetSelect(materials[0]?.name, preset)} />
        <List>
          {materials.map((material, index) => (
            <ListItem key={index} sx={{ flexDirection: 'column', alignItems: 'stretch' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <ListItemText 
                  primary={material.name}
                  secondary={`Area: ${material.area?.toFixed(2) || 0} m²`}
                />
                <TextField
                  label="Cost per m²"
                  type="number"
                  value={costs[material.name] || ''}
                  onChange={(e) => handleCostChange(material.name, e.target.value)}
                  InputProps={{
                    startAdornment: '$',
                  }}
                  sx={{ width: 150 }}
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <SketchPicker
                  color={material.color}
                  onChange={(color) => onMaterialUpdate(material.name, { color: color.rgb })}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2">
                    Estimated Cost: ${((costs[material.name] || 0) * (material.area || 0)).toFixed(2)}
                  </Typography>
                  <MaterialPresets 
                    onPresetSelect={(preset) => handlePresetSelect(material.name, preset)} 
                  />
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Calculate />
            Total Estimated Cost: ${calculateTotalCost().toFixed(2)}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MaterialEditor;
