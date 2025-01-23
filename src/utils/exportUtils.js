import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const exportToCSV = (report) => {
  const headers = ['Part', 'Material Layer', 'Thickness (mm)', 'Area (m²)', 'Cost per Unit', 'Total Cost'];
  const rows = report.flatMap(part => 
    part.layers.map(layer => [
      part.partName,
      layer.material,
      layer.thickness,
      layer.area.toFixed(2),
      `$${layer.costPerUnit.toFixed(2)}`,
      `$${layer.totalCost.toFixed(2)}`
    ])
  );

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'cost_breakdown.csv';
  link.click();
};

export const exportToPDF = (report, totalCost) => {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text('Cost Breakdown Report', 14, 22);
  
  doc.autoTable({
    head: [['Part', 'Material Layer', 'Thickness (mm)', 'Area (m²)', 'Cost per Unit', 'Total Cost']],
    body: report.flatMap(part => 
      part.layers.map(layer => [
        part.partName,
        layer.material,
        layer.thickness,
        layer.area.toFixed(2),
        `$${layer.costPerUnit.toFixed(2)}`,
        `$${layer.totalCost.toFixed(2)}`
      ])
    ),
    startY: 30
  });

  const finalY = doc.lastAutoTable.finalY || 30;
  doc.setFontSize(12);
  doc.text(`Total Estimated Cost: $${totalCost.toFixed(2)}`, 14, finalY + 20);
  
  doc.save('cost_breakdown.pdf');
};
