import React from 'react';

import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import Card from './card';
import { PlantData } from '../../types/types';

const samplePlantData: PlantData = {
  id: 1,
  imgSrc: 'fiddleleaf.jpg',
  imgAlt: 'Fiddle Leaf Fig',
  title: 'Fiddle Leaf Fig',
  petFriendly: false,
  inStock: 7,
  price: 26,
};

describe('Card', () => {
  test('renders without errors', () => {
    const wrapper = render(<Card {...samplePlantData} />);
    expect(wrapper).toBeTruthy();
  });

  test('displays correct title', () => {
    const wrapper = render(<Card {...samplePlantData} />);
    expect(wrapper.getByText('FIDDLE LEAF FIG')).toBeDefined();
  });

  test('displays correct pet-friendly status', () => {
    const { getByText } = render(<Card {...samplePlantData} />);
    expect(getByText('🐱🐶: dangerous! ❌')).toBeDefined();
  });

  test('displays correct stock and price', () => {
    const { getByText } = render(<Card {...samplePlantData} />);
    expect(getByText('In stock: 7')).toBeDefined();
    expect(getByText('Price: $26')).toBeDefined();
  });
});
