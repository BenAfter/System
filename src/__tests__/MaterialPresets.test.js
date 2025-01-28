import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MaterialPresets from '../components/MaterialPresets';

describe('MaterialPresets', () => {
  test('selects preset', () => {
    const handleSelect = jest.fn();
    render(<MaterialPresets onPresetSelect={handleSelect} />);
    
    fireEvent.click(screen.getByText('Solid Wood'));
    expect(handleSelect).toHaveBeenCalled();
  });
});
