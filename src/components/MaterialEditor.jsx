import React, { useState, useEffect } from 'react';
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

const MaterialEditor = ({ open, onClose, materials, selectedPart, onMaterialUpdate }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showCostBreakdown, setShowCostBreakdown] = useState(false);
  const [costs, setCosts] = useState({});
  const [layerCosts, setLayerCosts] = useState({});
  const [materialCosts, setMaterialCosts] = useState([]);
  const [costUpdateTimer, setCostUpdateTimer] = useState(null);

  const calculateMaterialCosts = (materials, layerCosts) => {
    return materials.map(material => {
      const baseCost = material.area * (layerCosts[material.name] || 0);
      const layersCost = (material.layers || []).reduce((total, layer) => {
        const layerArea = material.area;
        const layerVolume = layerArea * (layer.thickness / 1000);
        const materialCostPerUnit = layerCosts[layer.material] || 0;
        return total + (layerVolume * materialCostPerUnit);
      }, 0);

      return {
        name: material.name,
        area: material.area,
        baseCost,
        layersCost,
        totalCost: baseCost + layersCost
      };
    });
  };

  const updateCostsInRealTime = () => {
    if (costUpdateTimer) {
      clearTimeout(costUpdateTimer);
    }

    const timer = setTimeout(() => {
      const costs = calculateMaterialCosts(materials, layerCosts);
      setMaterialCosts(costs);
    }, 100);

    setCostUpdateTimer(timer);
  };

  useEffect(() => {
    updateCostsInRealTime();
    return () => {
      if (costUpdateTimer) {
        clearTimeout(costUpdateTimer);
      }
    };
  }, [materials, layerCosts]);

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
    onMaterialUpdate(materialName, { layers });
    updateCostsInRealTime();
  };

  const handleCostChange = (materialName, cost) => {
    setLayerCosts(prev => ({
      ...prev,
      [materialName]: cost
    }));
    updateCostsInRealTime();
  };

  const calculateTotalCost = () => {
    return materialCosts.reduce((total, material) => total + material.totalCost, 0);
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

          <Box sx={{ mt: 3, px: 2 }}>
            {materialCosts.map(cost => (
              <Box key={cost.name} sx={{ mb: 2 }}>
                <Typography variant="subtitle1">
                  {cost.name} Cost Breakdown:
                </Typography>
                <Typography variant="body2">
                  Area: {cost.area.toFixed(2)} m² 
                </Typography>
                <Typography variant="body2">
                  Base Cost: ${cost.baseCost.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  Layers Cost: ${cost.layersCost.toFixed(2)}
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  Total: ${cost.totalCost.toFixed(2)}
                </Typography>
              </Box>
            ))}
          </Box>

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
