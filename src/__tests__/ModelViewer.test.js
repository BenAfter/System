import React from 'react';
import { render, fireEvent, mockGeometryData, mockMaterialData } from './utils/testUtils';
import ModelViewer from '../components/ModelViewer';

describe('ModelViewer', () => {
  const mockModelData = {
    geometries: [mockGeometryData],
    materials: [mockMaterialData]
  };

  test('renders with mock data', () => {
    const { container } = render(<ModelViewer modelData={mockModelData} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
