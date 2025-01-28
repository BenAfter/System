import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MaterialLayer from '../components/MaterialLayer';

describe('MaterialLayer', () => {
  test('adds new layer', () => {
    const handleUpdate = jest.fn();
    render(<MaterialLayer onLayerUpdate={handleUpdate} />);
    
    fireEvent.click(screen.getByText('Add Layer'));
    expect(handleUpdate).toHaveBeenCalled();
  });
});
