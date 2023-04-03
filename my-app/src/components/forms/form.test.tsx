import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, fireEvent, screen, act, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from './form';
import { PlantData } from 'types/types';

describe('Form', () => {
  const cards: PlantData[] = [];
  const updateCards = (card: PlantData) => cards.push(card);
  let wrapper: RenderResult;

  beforeEach(() => {
    wrapper = render(<Form cards={cards} updateCards={updateCards} />);
  });

  test('renders all inputs', async () => {
    const form = wrapper.getByRole('form');
    const nameInput = wrapper.getByLabelText('Name') as HTMLInputElement;
    const dateInput = wrapper.getByLabelText('Delivery Date') as HTMLInputElement;
    const priceSelect = wrapper.getByLabelText('Price') as HTMLSelectElement;
    const yesOption = wrapper.getByLabelText('Yes') as HTMLInputElement;
    const noOption = wrapper.getByLabelText('No') as HTMLInputElement;
    const imageInput = wrapper.getByLabelText('Upload an image') as HTMLInputElement;
    const checkboxInput = wrapper.getByLabelText(
      'I agree to sell you this plant'
    ) as HTMLInputElement;
    const submitButton = wrapper.getByText('Submit');

    expect(form).toBeDefined();
    expect(nameInput).toBeDefined();
    expect(dateInput).toBeDefined();
    expect(priceSelect).toBeDefined();
    expect(yesOption).toBeDefined();
    expect(noOption).toBeDefined();
    expect(imageInput).toBeDefined();
    expect(checkboxInput).toBeDefined();
    expect(submitButton).toBeDefined();
  });

  test('inputs are filled', async () => {
    const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
    const dateInput = screen.getByLabelText('Delivery Date') as HTMLInputElement;
    const priceSelect = screen.getByLabelText('Price') as HTMLSelectElement;
    const petFriendlyRadio = screen.getByLabelText(/Yes/i) as HTMLInputElement;
    const imageInput = screen.getByLabelText('Upload an image') as HTMLInputElement;
    const checkboxInput = screen.getByLabelText(
      'I agree to sell you this plant'
    ) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'Test Plant' } });
    fireEvent.change(dateInput, { target: { value: '2023-04-10' } });
    fireEvent.change(priceSelect, { target: { value: '26' } });
    act(() => {
      fireEvent.click(petFriendlyRadio, { target: { value: 'true' } });
    });
    const file = new File(['(⌐□_□)'], 'test-plant.png', { type: 'image/png' });
    fireEvent.change(imageInput, { target: { files: [file] } });
    act(() => {
      fireEvent.click(checkboxInput, { target: { checked: true } });
    });

    expect(nameInput.value).toBe('Test Plant');
    expect(dateInput.value).toBe('2023-04-10');
    expect(priceSelect.value).toBe('26');
    expect(petFriendlyRadio.value).toBe('true');
    expect(imageInput.files).toBeTruthy();
    if (imageInput.files) {
      expect(imageInput.files[0]).toStrictEqual(file);
      expect(imageInput.files.length).toBe(1);
    }
    expect(checkboxInput).toBeChecked();
  });

  test('renders errors', async () => {
    const form = await wrapper.findByRole('form');
    fireEvent.submit(form);
    expect(await wrapper.findByText("Don't forget to give your plant a name!")).toBeInTheDocument();
    expect(await wrapper.findByText('Select a delivery date')).toBeInTheDocument();
    expect(await wrapper.findByText('Select a price value')).toBeInTheDocument();
    expect(
      await wrapper.findByText("Tell if your plant is pet-friendly, it's important")
    ).toBeInTheDocument();
    expect(
      await wrapper.findByText("Don't forget to upload a picture of your plant!")
    ).toBeInTheDocument();
    expect(
      await wrapper.findByText("Don't you agree to sell us this plant? 👉👈")
    ).toBeInTheDocument();

    fireEvent.change(wrapper.getByLabelText('Name'), { target: { value: 'test Plant' } });
    fireEvent.submit(form);

    expect(await wrapper.findByText('Start with an uppercase letter')).toBeInTheDocument();

    fireEvent.change(wrapper.getByLabelText('Delivery Date'), { target: { value: '2023-02-01' } });
    fireEvent.submit(form);

    expect(await wrapper.findByText('Give us at least one day ;)')).toBeInTheDocument();
  });
});
