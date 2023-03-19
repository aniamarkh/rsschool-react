import React from 'react';
import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import CardsList from './cardsList';
import { plantsData } from '../../data/plants';

describe('CardsList', () => {
  test('renders without errors', () => {
    const wrapper = render(<CardsList />);
    expect(wrapper).toBeTruthy();
  });

  test('renders correct number of Card components', () => {
    const wrapper = render(<CardsList />);
    const cardsNumber = wrapper.container.getElementsByClassName('card-list__item');

    expect(cardsNumber.length).toBe(15);
  });

  test('renders PlantCard components with correct keys', () => {
    const wrapper = render(<CardsList />);
    plantsData.forEach((plant) => {
      const plantCard = wrapper.container.querySelector(`[data-id="${plant.id}"]`);
      expect(plantCard).toBeDefined();
      expect(wrapper.getByText(plant.title.toUpperCase())).toBeDefined();
    });
  });
});
