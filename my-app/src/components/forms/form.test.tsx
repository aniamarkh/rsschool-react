import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Form from './form';
import { plantsData } from '../../data/formData';

describe('Form', () => {
  test('renders all inputs', async () => {
    const wrapper = render(<Form />);
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

    expect(nameInput).toBeDefined();
    expect(dateInput).toBeDefined();
    expect(priceSelect).toBeDefined();
    expect(yesOption).toBeDefined();
    expect(noOption).toBeDefined();
    expect(imageInput).toBeDefined();
    expect(checkboxInput).toBeDefined();
    expect(submitButton).toBeDefined();
  });

  test('filling the form', async () => {
    const wrapper = render(<Form />);
    test('inputs are filled', async () => {
      const nameInput = wrapper.getByLabelText('Name') as HTMLInputElement;
      const dateInput = wrapper.getByLabelText('Delivery Date') as HTMLInputElement;
      const priceSelect = wrapper.getByLabelText('Price') as HTMLSelectElement;
      const petFriendlyRadio = wrapper.getByLabelText(/Yes/i);
      const imageInput = wrapper.getByLabelText('Upload an image') as HTMLInputElement;
      const checkboxInput = wrapper.getByLabelText(
        'I agree to sell you this plant'
      ) as HTMLInputElement;

      userEvent.type(nameInput, 'Test Plant');
      userEvent.type(dateInput, '2023-04-10');
      userEvent.selectOptions(priceSelect, '26');
      fireEvent.click(petFriendlyRadio);
      const file = new File(['(⌐□_□)'], 'test-plant.png', { type: 'image/png' });
      fireEvent.change(imageInput, { target: { files: [file] } });
      userEvent.click(checkboxInput);
      expect(nameInput.value).toBe('Test Plant');
      expect(dateInput.value).toBe('2023-04-10');
      expect(priceSelect.value).toBe('26');
      expect(petFriendlyRadio).toBeChecked();
      expect(imageInput.files).toBeTruthy();
      if (imageInput.files) {
        expect(imageInput.files[0]).toStrictEqual(file);
        expect(imageInput.files.length).toBe(1);
      }
      expect(checkboxInput).toBeChecked();
    });
  });

  test('renders errors', async () => {
    const wrapper = render(<Form />);

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

  test('filling the form', async () => {
    const wrapper = render(<Form />);
    test('confirmation message is rendered', async () => {
      const nameInput = wrapper.getByLabelText('Name') as HTMLInputElement;
      const dateInput = wrapper.getByLabelText('Delivery Date') as HTMLInputElement;
      const priceSelect = wrapper.getByLabelText('Price') as HTMLSelectElement;
      const petFriendlyRadio = wrapper.getByLabelText(/Yes/i);
      const imageInput = wrapper.getByLabelText('Upload an image') as HTMLInputElement;
      const checkboxInput = wrapper.getByLabelText(
        'I agree to sell you this plant'
      ) as HTMLInputElement;

      userEvent.type(nameInput, 'Test Plant');
      userEvent.type(dateInput, '2023-04-10');
      userEvent.selectOptions(priceSelect, '26');
      fireEvent.click(petFriendlyRadio);
      const file = new File(['(⌐□_□)'], 'test-plant.png', { type: 'image/png' });
      fireEvent.change(imageInput, { target: { files: [file] } });
      userEvent.click(checkboxInput);

      const form = await wrapper.findByRole('form');
      fireEvent.submit(form);

      expect(await wrapper.findByText('Your plant has been added!')).toBeInTheDocument();
      expect(await wrapper.findByText('Test plant')).toBeInTheDocument();
      expect(await wrapper.findByText('delivery: 10.04.2023')).toBeInTheDocument();
      expect(await wrapper.findByText('$26')).toBeInTheDocument();
      expect(await wrapper.findByText('🐱🐶: safe')).toBeInTheDocument();
      expect(plantsData.length).toBe(1);
    });
  });
});
