import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, RenderResult } from '@testing-library/react';
import MoviesList from './moviesList';
import { popularResult } from '../../api/mock/handlers';

describe('Movies List', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    wrapper = render(<MoviesList data={popularResult.results} />);
  });

  test('renders without errors', () => {
    expect(wrapper).toBeTruthy();
  });

  test('renders correct number of Card components', () => {
    const cardsNumber = wrapper.container.getElementsByClassName('card-list__item');
    expect(cardsNumber.length).toBe(1);
  });
});
