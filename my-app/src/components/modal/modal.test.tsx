import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, RenderResult } from '@testing-library/react';
import { server } from '../../api/mock/server';
import ModalContent from './modal';
import { movieByIdResult } from '../../api/mock/handlers';

const onClose = () => {
  return;
};

describe('Card', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  let wrapper: RenderResult;
  beforeEach(() => {
    wrapper = render(<ModalContent data={movieByIdResult} onClose={onClose} />);
  });

  test('render modal', async () => {
    expect(wrapper.container.getElementsByClassName('modal__window')).toBeDefined();
    expect(wrapper.getByText(movieByIdResult.title.toUpperCase() + ', 2023')).toBeDefined();
    expect(wrapper.getByText('Original title: ' + movieByIdResult.original_title)).toBeDefined();
    expect(wrapper.getByText(`${Math.round(movieByIdResult.vote_average)}/10`)).toBeDefined();
    movieByIdResult.genres.forEach((genre) => {
      expect(wrapper.getByText(genre.name)).toBeDefined();
    });
    movieByIdResult.production_countries.forEach((country) => {
      expect(wrapper.getByText(country.name)).toBeDefined();
    });
    movieByIdResult.production_companies.forEach((company) => {
      expect(wrapper.getByText(company.name)).toBeDefined();
    });
  });
});
