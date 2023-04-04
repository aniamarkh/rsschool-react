import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from './form';
import { PlantData } from 'types/types';

describe('Form', () => {
  global.URL.createObjectURL = vi.fn();
  const cards: PlantData[] = [];
  const updateCards = (card: PlantData) => cards.push(card);
  let form: HTMLFormElement;

  beforeEach(() => {
    render(<Form cards={cards} updateCards={updateCards} />);
    form = screen.getByRole('form');
  });

  test('renders without errors', () => {
    expect(form).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Delivery Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Price')).toBeInTheDocument();
    expect(screen.getByLabelText('Yes')).toBeInTheDocument();
    expect(screen.getByLabelText('No')).toBeInTheDocument();
    expect(screen.getByLabelText('Upload an image')).toBeInTheDocument();
    expect(screen.getByLabelText('I agree to sell you this plant')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('validate formElements', async () => {
    fireEvent.submit(form);

    expect(await screen.findByText("Don't forget to give your plant a name!")).toBeInTheDocument();
    expect(await screen.findByText('Select a delivery date')).toBeInTheDocument();
    expect(await screen.findByText('Select a price value')).toBeInTheDocument();
    expect(
      await screen.findByText("Tell if your plant is pet-friendly, it's important")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Don't forget to upload a picture of your plant!")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Don't you agree to sell us this plant? 👉👈")
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'test' } });
    fireEvent.submit(form);
    expect(await screen.findByText('Start with an uppercase letter')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Delivery Date'), { target: { value: '2023-02-01' } });
    fireEvent.submit(form);
    expect(await screen.findByText('Give us at least one day ;)')).toBeInTheDocument();
  });
});
