import React from 'react';
import { render, fireEvent } from './utils/testUtils';
import MaterialLayer from '../components/MaterialLayer';

describe('MaterialLayer', () => {
  test('adds layer with default values', () => {
    const handleUpdate = jest.fn();
    const { getByText } = render(<MaterialLayer onLayerUpdate={handleUpdate} />);
    
    fireEvent.click(getByText('Add Layer'));
    expect(handleUpdate).toHaveBeenCalledWith([{
      material: 'wood',
      thickness: 1,
      cost: 0
    }]);
  });
});
