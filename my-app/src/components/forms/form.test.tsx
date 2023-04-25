import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from './form';
import { CardData } from 'types/types';

describe('Form', () => {
  global.URL.createObjectURL = vi.fn();
  const cards: CardData[] = [];
  const updateCards = (card: CardData) => cards.push(card);
  let form: HTMLFormElement;

  beforeEach(() => {
    render(<Form cards={cards} updateCards={updateCards} />);
    form = screen.getByRole('form');
  });

  test('renders without errors', () => {
    expect(form).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Release Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Choose a genre')).toBeInTheDocument();
    expect(screen.getByLabelText('Yes')).toBeInTheDocument();
    expect(screen.getByLabelText('No')).toBeInTheDocument();
    expect(screen.getByLabelText('Upload a poster')).toBeInTheDocument();
    expect(screen.getByLabelText('I agree to add this movie')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('validate formElements', async () => {
    fireEvent.submit(form);

    expect(await screen.findByText("Don't forget to give your movie a title!")).toBeInTheDocument();
    expect(await screen.findByText('Select a release date')).toBeInTheDocument();
    expect(await screen.findByText('Please choose a genre for your movie')).toBeInTheDocument();
    expect(
      await screen.findByText("Tell if this movie is another bad sequel, it's important")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Don't forget to upload a poster for your movie!")
    ).toBeInTheDocument();
    expect(await screen.findByText("Don't you agree to add this movie? 👉👈")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'test' } });
    fireEvent.submit(form);
    expect(await screen.findByText('Start with an uppercase letter')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Release Date'), { target: { value: '2100-10-10' } });
    fireEvent.submit(form);
    expect(await screen.findByText('Select a valid release date in the past')).toBeInTheDocument();
  });
});
