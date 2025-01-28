import React from 'react';
import { render, fireEvent, mockMaterialData } from './utils/testUtils';
import MaterialPresets from '../components/MaterialPresets';

describe('MaterialPresets', () => {
  test('selects preset material', () => {
    const handleSelect = jest.fn();
    const { getByText } = render(<MaterialPresets onPresetSelect={handleSelect} />);
    
    fireEvent.click(getByText('Solid Wood'));
    expect(handleSelect).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Solid Wood'
    }));
  });
});
