import React from 'react';
import { render, mockMaterialData } from './utils/testUtils';
import CostBreakdown from '../components/CostBreakdown';

describe('CostBreakdown', () => {
  const mockCosts = {
    [mockMaterialData.name]: mockMaterialData.defaultCost
  };

  test('calculates total cost correctly', () => {
    const { getByText } = render(
      <CostBreakdown
        open={true}
        materials={[{ ...mockMaterialData, area: 2.5 }]}
        costs={mockCosts}
        onClose={() => {}}
      />
    );
    
    expect(getByText('$250.00')).toBeInTheDocument();
  });
});
