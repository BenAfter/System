import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModelControls from '../components/ModelControls';

describe('ModelControls', () => {
  test('handles zoom controls', () => {
    const handleZoom = jest.fn();
    const handleReset = jest.fn();
    
    render(
      <ModelControls 
        onZoom={handleZoom}
        onReset={handleReset}
        onMaterialEdit={() => {}}
      />
    );

    fireEvent.click(screen.getByTitle('Zoom In'));
    expect(handleZoom).toHaveBeenCalledWith(-1);

    fireEvent.click(screen.getByTitle('Zoom Out'));
    expect(handleZoom).toHaveBeenCalledWith(1);
  });
});
