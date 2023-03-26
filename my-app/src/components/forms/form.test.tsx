import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from './form';

describe('Form', () => {
  test('renders without crashing', () => {
    const wrapper = render(<Form />);
    expect(wrapper).toBeTruthy();
  });

  test('renders all input components', () => {
    const wrapper = render(<Form />);

    expect(wrapper.getByText('Name')).toBeDefined();
    expect(wrapper.getByText('Delivery Date')).toBeDefined();
    expect(wrapper.getByText('Price')).toBeDefined();
    expect(wrapper.getByText('Is pet-friendly?')).toBeDefined();
    expect(wrapper.getByText('Photo Upload')).toBeDefined();
    expect(wrapper.getByText('I agree to sell you this plant')).toBeDefined();
  });

  test('displays error messages when submitting an empty form', async () => {
    const wrapper = render(<Form />);

    const form = await wrapper.findByRole('form');
    fireEvent.submit(form);
    await waitFor(async () => {
      expect(
        await wrapper.findByText("Don't forget to give your plant a name!")
      ).toBeInTheDocument();
      expect(await wrapper.findByText('Select a delivery date')).toBeInTheDocument();
      expect(await wrapper.findByText('Please select price')).toBeInTheDocument();
      expect(
        await wrapper.findByText("Tell if your plant is pet-friendly, it's important")
      ).toBeInTheDocument();
      expect(await wrapper.findByText('Upload a photo, we need it')).toBeInTheDocument();
      expect(
        await wrapper.findByText("Don't you agree to sell us this plant? 👉👈")
      ).toBeInTheDocument();
    });

    fireEvent.change(wrapper.getByLabelText('Name'), { target: { value: 'test Plant' } });
    fireEvent.submit(form);
    await waitFor(async () => {
      expect(await wrapper.getByText('Start with an uppercase letter')).toBeInTheDocument();
    });
  });
});
