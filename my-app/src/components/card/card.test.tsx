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
  price: 26,
  date: '69.06.9069',
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

  test('displays correct stock', () => {
    const { getByText } = render(<Card {...samplePlantData} />);
    expect(getByText('Price: $26')).toBeDefined();
  });
  test('displays correct date', () => {
    const { getByText } = render(<Card {...samplePlantData} />);
    expect(getByText('delivery: 69.06.9069')).toBeDefined();
  });
});
