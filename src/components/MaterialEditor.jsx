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
  Button,
  Typography,
  Divider,
  Tab,
  Tabs
} from '@mui/material';
import { Close, Calculate, Assessment } from '@mui/icons-material';
import { SketchPicker } from 'react-color';
import MaterialLayer from './MaterialLayer';
import MaterialPresets from './MaterialPresets';
import CostBreakdown from './CostBreakdown';

const MaterialEditor = ({ open, onClose, materials, onMaterialUpdate }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showCostBreakdown, setShowCostBreakdown] = useState(false);
  const [costs, setCosts] = useState({});
  const [layerCosts, setLayerCosts] = useState({});

  const handlePresetSelect = (materialName, preset) => {
    onMaterialUpdate(materialName, {
      color: preset.color,
      cost: preset.defaultCost
    });

    setCosts(prev => ({
      ...prev,
      [materialName]: preset.defaultCost
    }));

    if (preset.layers) {
      setLayerCosts(prev => ({
        ...prev,
        [preset.name]: preset.defaultCost
      }));
    }
  };

  const handleLayerUpdate = (materialName, layers) => {
    const totalCost = calculateLayeredCost(materialName, layers);
    handleCostChange(materialName, totalCost);
    onMaterialUpdate(materialName, { layers });
  };

  const calculateLayeredCost = (materialName, layers) => {
    return layers.reduce((total, layer) => {
      const materialCostPerUnit = layerCosts[layer.material] || 0;
      const layerArea = calculateLayerArea(materialName);
      const layerVolume = layerArea * (layer.thickness / 1000); // Convert mm to m
      return total + (materialCostPerUnit * layerVolume);
    }, 0);
  };

  const calculateLayerArea = (materialName) => {
    const material = materials.find(m => m.name === materialName);
    return material ? material.area : 0;
  };

  const handleCostChange = (materialName, cost) => {
    const newCost = parseFloat(cost);
    setCosts(prev => ({
      ...prev,
      [materialName]: newCost
    }));
    
    onMaterialUpdate(materialName, { cost: newCost });
  };

  const handleLayerCostUpdate = (materialType, costPerUnit) => {
    setLayerCosts(prev => ({
      ...prev,
      [materialType]: costPerUnit
    }));
  };

  const calculateTotalCost = () => {
    return materials.reduce((total, material) => {
      const materialLayers = material.layers || [];
      const layeredCost = calculateLayeredCost(material.name, materialLayers);
      return total + layeredCost;
    }, 0);
  };

  const handleViewBreakdown = () => {
    setShowCostBreakdown(true);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Material Configuration
          <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
            <Tab label="Basic Materials" />
            <Tab label="Material Layers" />
          </Tabs>

          {activeTab === 0 && (
            <MaterialPresets onPresetSelect={(preset) => handlePresetSelect(materials[0]?.name, preset)} />
          )}

          {activeTab === 1 && (
            <List>
              {materials.map((material, index) => (
                <ListItem key={index} sx={{ flexDirection: 'column', alignItems: 'stretch' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <ListItemText 
                      primary={material.name}
                      secondary={`Area: ${material.area?.toFixed(2) || 0} m²`}
                    />
                  </Box>
                  <MaterialLayer 
                    onLayerUpdate={(layers) => handleLayerUpdate(material.name, layers)}
                  />
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <SketchPicker
                      color={material.color}
                      onChange={(color) => onMaterialUpdate(material.name, { color: color.rgb })}
                    />
                  </Box>
                  <Divider sx={{ my: 2 }} />
                </ListItem>
              ))}
            </List>
          )}

          <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Calculate />
                Total Estimated Cost: ${calculateTotalCost().toFixed(2)}
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<Assessment />}
                onClick={handleViewBreakdown}
              >
                View Detailed Breakdown
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <CostBreakdown
        open={showCostBreakdown}
        onClose={() => setShowCostBreakdown(false)}
        materials={materials}
        costs={layerCosts}
      />
    </>
  );
};

export default MaterialEditor;
