import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MaterialEditor from '../components/MaterialEditor';

describe('MaterialEditor', () => {
  const mockMaterials = [
    {
      name: 'wood_oak',
      color: { r: 139, g: 69, b: 19, a: 1 },
      defaultCost: 800,
      layers: []
    }
  ];

  test('renders material list', () => {
    render(
      <MaterialEditor 
        open={true}
        materials={mockMaterials}
        onClose={() => {}}
      />
    );
    expect(screen.getByText('wood_oak')).toBeInTheDocument();
  });

  test('handles cost updates', () => {
    const handleUpdate = jest.fn();
    render(
      <MaterialEditor
        open={true}
        materials={mockMaterials}
        onMaterialUpdate={handleUpdate}
        onClose={() => {}}
      />
    );
  });
});
