import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box
} from '@mui/material';
import { Close, Download } from '@mui/icons-material';
import { exportCostBreakdown, generateCSVReport } from '../utils/exportUtils';

const CostBreakdown = ({ open, onClose, materials, costs }) => {
  const handleExportJSON = () => {
    exportCostBreakdown(materials, costs);
  };

  const handleExportCSV = () => {
    generateCSVReport(materials, costs);
  };

  const calculateTotalCost = (material) => {
    const baseCost = material.area * (costs[material.name] || 0);
    const layerCosts = material.layers?.reduce((total, layer) => {
      return total + (material.area * (layer.thickness / 1000) * layer.cost);
    }, 0) || 0;
    return baseCost + layerCosts;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Cost Breakdown
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Material</TableCell>
                <TableCell align="right">Area (m²)</TableCell>
                <TableCell align="right">Base Cost ($)</TableCell>
                <TableCell align="right">Layer Costs ($)</TableCell>
                <TableCell align="right">Total ($)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {materials.map((material) => {
                const baseCost = material.area * (costs[material.name] || 0);
                const layerCosts = material.layers?.reduce((total, layer) => {
                  return total + (material.area * (layer.thickness / 1000) * layer.cost);
                }, 0) || 0;

                return (
                  <TableRow key={material.name}>
                    <TableCell>{material.name}</TableCell>
                    <TableCell align="right">{material.area.toFixed(2)}</TableCell>
                    <TableCell align="right">{baseCost.toFixed(2)}</TableCell>
                    <TableCell align="right">{layerCosts.toFixed(2)}</TableCell>
                    <TableCell align="right">{calculateTotalCost(material).toFixed(2)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={handleExportCSV}
          >
            Export CSV
          </Button>
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={handleExportJSON}
          >
            Export JSON
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CostBreakdown;
