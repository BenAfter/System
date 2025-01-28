import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModelViewer from '../components/ModelViewer';

describe('ModelViewer', () => {
  const mockModelData = {
    geometries: [],
    materials: []
  };

  test('renders without crashing', () => {
    render(<ModelViewer modelData={mockModelData} />);
  });

  test('handles zoom controls', () => {
    render(<ModelViewer modelData={mockModelData} />);
    const zoomInButton = screen.getByTitle('Zoom In');
    const zoomOutButton = screen.getByTitle('Zoom Out');
    
    fireEvent.click(zoomInButton);
    fireEvent.click(zoomOutButton);
  });
});
