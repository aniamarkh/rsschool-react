import React from 'react';
import { Provider } from 'react-redux';
import { describe, test, expect } from 'vitest';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import { server } from '../../api/mock/server';
import ModalContent from './modal';
import { movieByIdResult } from '../../api/mock/handlers';
import { store } from '../../store/store';

const onClose = () => {
  return;
};

describe('Card', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('render modal', async () => {
    const wrapper = render(
      <Provider store={store}>
        <ModalContent data={101} onClose={onClose} />
      </Provider>
    );
    expect(wrapper.container.getElementsByClassName('modal__window')).toBeDefined();
    expect(wrapper.container.getElementsByClassName('loading')).toBeDefined();
    await waitForElementToBeRemoved(() => wrapper.container.getElementsByClassName('loading'));
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
