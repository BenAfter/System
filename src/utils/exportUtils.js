import { saveAs } from 'file-saver';

export const exportCostBreakdown = (materials, costs) => {
  const breakdownData = materials.map(material => ({
    name: material.name,
    area: material.area,
    baseCost: material.area * (costs[material.name] || 0),
    layers: material.layers?.map(layer => ({
      material: layer.material,
      thickness: layer.thickness,
      cost: layer.cost,
      volume: material.area * (layer.thickness / 1000),
      totalCost: material.area * (layer.thickness / 1000) * layer.cost
    }))
  }));

  const totalCost = breakdownData.reduce((sum, item) => {
    const layersCost = item.layers?.reduce((total, layer) => total + layer.totalCost, 0) || 0;
    return sum + item.baseCost + layersCost;
  }, 0);

  const report = {
    timestamp: new Date().toISOString(),
    materials: breakdownData,
    totalCost
  };

  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
  saveAs(blob, `cost-breakdown-${Date.now()}.json`);
};

export const generateCSVReport = (materials, costs) => {
  const headers = ['Material', 'Area (m²)', 'Base Cost ($)', 'Layer Costs ($)', 'Total Cost ($)'];
  const rows = materials.map(material => {
    const baseCost = material.area * (costs[material.name] || 0);
    const layerCosts = material.layers?.reduce((total, layer) => {
      return total + (material.area * (layer.thickness / 1000) * layer.cost);
    }, 0) || 0;

    return [
      material.name,
      material.area.toFixed(2),
      baseCost.toFixed(2),
      layerCosts.toFixed(2),
      (baseCost + layerCosts).toFixed(2)
    ];
  });

  const csv = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, `material-costs-${Date.now()}.csv`);
};
