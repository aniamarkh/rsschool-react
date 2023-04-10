import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, RenderResult } from '@testing-library/react';
import { server } from '../../api/mock/server';
import ModalContent from './modal';
import { ModalData } from '../../types/types';

const modalData: ModalData = {
  title: 'Sample Movie 1',
  original_title: 'Sample Movie 1',
  poster: '/path/to/poster.jpg',
  genres: ['Action', 'Adventure'],
  release: '2023',
  rate: 7,
  overview: 'This is a sample movie overview.',
  homepage: 'https://www.example.com',
  country: ['United States of America'],
  prod: ['Production Company 1'],
};

const onClose = () => {
  return;
};

describe('Card', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  let wrapper: RenderResult;
  beforeEach(() => {
    wrapper = render(<ModalContent data={modalData} onClose={onClose} />);
  });

  test('render modal', async () => {
    expect(wrapper.container.getElementsByClassName('modal__window')).toBeDefined();
    expect(wrapper.getByText(modalData.title.toUpperCase() + ', 2023')).toBeDefined();
    expect(wrapper.getByText('Original title: ' + modalData.original_title)).toBeDefined();
    expect(wrapper.getByText(`${modalData.rate}/10`)).toBeDefined();
    modalData.genres.forEach((genre) => {
      expect(wrapper.getByText(genre)).toBeDefined();
    });
    modalData.country.forEach((country) => {
      expect(wrapper.getByText(country)).toBeDefined();
    });
    modalData.prod.forEach((company) => {
      expect(wrapper.getByText(company)).toBeDefined();
    });
  });
});
