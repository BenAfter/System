import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography
} from '@mui/material';
import { Download, PictureAsPdf } from '@mui/icons-material';
import { exportToCSV, exportToPDF } from '../utils/exportUtils';

const CostBreakdown = ({ open, onClose, materials, costs }) => {
  const generateReport = () => {
    const report = materials.map(material => {
      const layers = material.layers || [];
      const layerCosts = layers.map(layer => ({
        material: layer.material,
        thickness: layer.thickness,
        area: material.area,
        costPerUnit: costs[layer.material] || 0,
        totalCost: calculateLayerCost(layer, material.area, costs[layer.material])
      }));

      return {
        partName: material.name,
        layers: layerCosts,
        totalCost: layerCosts.reduce((sum, layer) => sum + layer.totalCost, 0)
      };
    });

    return report;
  };

  const calculateLayerCost = (layer, area, costPerUnit) => {
    const volume = area * (layer.thickness / 1000);
    return volume * costPerUnit;
  };

  const report = generateReport();
  const totalCost = report.reduce((sum, part) => sum + part.totalCost, 0);

  const handleExportCSV = () => {
    exportToCSV(report);
  };

  const handleExportPDF = () => {
    exportToPDF(report, totalCost);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        Detailed Cost Breakdown
      </DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Part</TableCell>
                <TableCell>Material Layer</TableCell>
                <TableCell align="right">Thickness (mm)</TableCell>
                <TableCell align="right">Area (m²)</TableCell>
                <TableCell align="right">Cost per Unit</TableCell>
                <TableCell align="right">Total Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {report.map((part) => (
                part.layers.map((layer, index) => (
                  <TableRow key={`${part.partName}-${index}`}>
                    {index === 0 && (
                      <TableCell rowSpan={part.layers.length}>
                        {part.partName}
                      </TableCell>
                    )}
                    <TableCell>{layer.material}</TableCell>
                    <TableCell align="right">{layer.thickness}</TableCell>
                    <TableCell align="right">{layer.area.toFixed(2)}</TableCell>
                    <TableCell align="right">${layer.costPerUnit.toFixed(2)}</TableCell>
                    <TableCell align="right">${layer.totalCost.toFixed(2)}</TableCell>
                  </TableRow>
                ))
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            Total Estimated Cost: ${totalCost.toFixed(2)}
          </Typography>
          <Box>
            <Button 
              startIcon={<Download />} 
              variant="outlined" 
              sx={{ mr: 1 }}
              onClick={handleExportCSV}
            >
              Export CSV
            </Button>
            <Button 
              startIcon={<PictureAsPdf />} 
              variant="contained"
              onClick={handleExportPDF}
            >
              Export PDF
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CostBreakdown;
