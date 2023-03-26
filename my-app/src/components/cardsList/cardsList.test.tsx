import React from 'react';
import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import CardsList from './cardsList';
import { PlantData } from 'types/types';

const data: PlantData[] = [
  {
    id: 1,
    imgSrc: 'assets/img/fiddleleaf.jpg',
    imgAlt: 'Fiddle Leaf Fig',
    title: 'Fiddle Leaf Fig',
    petFriendly: false,
    price: 26,
    date: '04.04.2023',
  },
  {
    id: 2,
    imgSrc: 'assets/img/snake.jpg',
    imgAlt: 'Snake Plant',
    title: 'Snake Plant',
    petFriendly: true,
    price: 13,
    date: '02.04.2023',
  },
];

describe('CardsList', () => {
  test('renders without errors', () => {
    const wrapper = render(<CardsList data={data} />);
    expect(wrapper).toBeTruthy();
  });

  test('renders correct number of Card components', () => {
    const wrapper = render(<CardsList data={data} />);
    const cardsNumber = wrapper.container.getElementsByClassName('card-list__item');

    expect(cardsNumber.length).toBe(2);
  });

  test('renders PlantCard components with correct keys', () => {
    const wrapper = render(<CardsList data={data} />);
    data.forEach((plant) => {
      const plantCard = wrapper.container.querySelector(`[data-id="${plant.id}"]`);
      expect(plantCard).toBeDefined();
      expect(wrapper.getByText(plant.title.toUpperCase())).toBeDefined();
    });
  });
});
