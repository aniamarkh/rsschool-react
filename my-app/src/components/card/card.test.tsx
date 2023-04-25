import React from 'react';
import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import Card from './card';
import { CardData } from '../../types/types';

const sampleCardData: CardData = {
  id: 1,
  imgSrc: 'movieposter.jpg',
  imgAlt: 'Movie Title poster',
  title: 'Movie Title',
  isSequel: false,
  genre: 'Comedy',
  date: '10.01.1996',
};

describe('Card', () => {
  test('renders without errors', () => {
    const wrapper = render(<Card {...sampleCardData} />);
    expect(wrapper).toBeTruthy();
  });

  test('displays correct title', () => {
    const wrapper = render(<Card {...sampleCardData} />);
    expect(wrapper.getByText(sampleCardData.title.toUpperCase())).toBeDefined();
  });

  test('displays correct sequel status', () => {
    const { getByText } = render(<Card {...sampleCardData} />);
    expect(getByText(`⭐️it's not another bad sequel!⭐️`)).toBeDefined();
  });

  test('displays correct genre', () => {
    const { getByText } = render(<Card {...sampleCardData} />);
    expect(getByText(`genre: ${sampleCardData.genre}`)).toBeDefined();
  });
  test('displays correct date', () => {
    const { getByText } = render(<Card {...sampleCardData} />);
    expect(getByText(`release: ${sampleCardData.date}`)).toBeDefined();
  });
});
