import React from 'react';
import { render, fireEvent, mockMaterialData } from './utils/testUtils';
import MaterialEditor from '../components/MaterialEditor';

describe('MaterialEditor', () => {
  test('renders with mock material data', () => {
    const { getByText } = render(
      <MaterialEditor 
        open={true}
        materials={[mockMaterialData]}
        onClose={() => {}}
      />
    );
    expect(getByText(mockMaterialData.name)).toBeInTheDocument();
  });
});
