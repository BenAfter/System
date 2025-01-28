import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CostBreakdown from '../components/CostBreakdown';

describe('CostBreakdown', () => {
  const mockMaterials = [
    {
      name: 'wood_oak',
      area: 2.5,
      layers: [
        { material: 'wood', thickness: 18, cost: 800 }
      ]
    }
  ];

  const mockCosts = {
    wood_oak: 800
  };

  test('displays cost breakdown', () => {
    render(
      <CostBreakdown
        open={true}
        materials={mockMaterials}
        costs={mockCosts}
        onClose={() => {}}
      />
    );

    expect(screen.getByText('wood_oak')).toBeInTheDocument();
    expect(screen.getByText('2.50')).toBeInTheDocument();
  });
});
