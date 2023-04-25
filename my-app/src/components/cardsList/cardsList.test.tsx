import React from 'react';
import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import CardsList from './cardsList';
import { CardData } from 'types/types';

const data: CardData[] = [
  {
    id: 1,
    imgSrc: 'movieposter1.jpg',
    imgAlt: 'Movie Title 1 poster',
    title: 'Movie Title 1',
    isSequel: false,
    genre: 'Comedy',
    date: '10.01.1996',
  },
  {
    id: 2,
    imgSrc: 'movieposter2.jpg',
    imgAlt: 'Movie Title 2 poster',
    title: 'Movie Title 2',
    isSequel: true,
    genre: 'Horror',
    date: '10.01.1997',
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
