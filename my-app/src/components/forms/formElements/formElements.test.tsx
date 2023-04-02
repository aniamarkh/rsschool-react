import React, { ReactNode } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { describe, test, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Checkbox from './checkboxInput';
import DateInput from './dateInput';
import ErrorMessage from './errorMessage';
import FileInput from './fileInput';
import RadioGroup from './radioGroup';
import PriceSelect from './priceSelect';
import TextInput from './textInput';
import { FormValues } from 'types/types';

interface WrapperProps {
  children: (methods: UseFormReturn<FormValues>) => ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  const methods = useForm<FormValues>();
  return <>{children(methods)}</>;
};

describe('TextInput tests', () => {
  test('renders input and label correctly', () => {
    const wrapper = render(
      <Wrapper>
        {(methods) => (
          <TextInput
            label="Name"
            name="title"
            register={methods.register}
            registerOptions={{
              required: "Don't forget to give your plant a name!",
              validate: (value) =>
                (value as string).charAt(0) === (value as string).charAt(0).toUpperCase() ||
                'Start with an uppercase letter',
            }}
          />
        )}
      </Wrapper>
    );
    const label = wrapper.getByText('Name');
    const input = wrapper.getByLabelText('Name') as HTMLInputElement;

    expect(label).toBeDefined();
    expect(input).toBeDefined();
  });
});

describe('DateInput tests', () => {
  test('renders input and label correctly', () => {
    const wrapper = render(
      <Wrapper>
        {(methods) => (
          <DateInput
            label="Delivery Date"
            name="date"
            register={methods.register}
            registerOptions={{
              required: 'Select a delivery date',
              validate: (value) => {
                const date = new Date(value as string);
                const today = new Date();
                return date > today || 'Give us at least one day ;)';
              },
            }}
          />
        )}
      </Wrapper>
    );
    const label = wrapper.getByText('Delivery Date');
    const input = wrapper.getByLabelText('Delivery Date') as HTMLInputElement;

    expect(label).toBeDefined();
    expect(input).toBeDefined();
  });
});

describe('PriceSelect tests', () => {
  test('renders input and label correctly', () => {
    const wrapper = render(
      <Wrapper>
        {(methods) => (
          <PriceSelect
            label="Price"
            name="price"
            register={methods.register}
            registerOptions={{
              required: 'Select a price value',
              validate: (value) => value !== 'default' || 'Select a price value',
            }}
          />
        )}
      </Wrapper>
    );
    const label = wrapper.getByText('Price');
    const input = wrapper.getByLabelText('Price') as HTMLInputElement;

    expect(label).toBeDefined();
    expect(input).toBeDefined();
  });

  test('displays options and selects a value', async () => {
    const wrapper = render(
      <Wrapper>
        {(methods) => (
          <PriceSelect
            label="Price"
            name="price"
            register={methods.register}
            registerOptions={{
              required: 'Select a price value',
              validate: (value) => value !== 'default' || 'Select a price value',
            }}
          />
        )}
      </Wrapper>
    );
    const input = wrapper.getByLabelText('Price') as HTMLSelectElement;

    expect(input.options).toHaveLength(4);

    fireEvent.change(input, { target: { value: '26' } });

    await waitFor(() => {
      expect(input.value).toBe('26');
    });
  });
});

describe('RadioGroup tests', () => {
  test('renders input and label correctly', () => {
    const wrapper = render(
      <Wrapper>
        {(methods) => (
          <RadioGroup
            label="RadioGroup"
            name="petFriendly"
            register={methods.register}
            registerOptions={{
              required: 'Tell if your plant is pet-friendly',
            }}
          />
        )}
      </Wrapper>
    );
    const label = wrapper.getByText('RadioGroup');
    const radioButtons = wrapper.getAllByLabelText(/(No|Yes)/) as HTMLInputElement[];

    expect(label).toBeDefined();
    expect(radioButtons).toHaveLength(2);
    expect(radioButtons[0].value).toBe('');
    expect(radioButtons[1].value).toBe('true');
  });
});

describe('FileInput tests', () => {
  test('renders input and label correctly', () => {
    const wrapper = render(
      <Wrapper>
        {(methods) => (
          <FileInput
            label="Upload an image"
            name="imgSrc"
            register={methods.register}
            registerOptions={{
              required: "Don't forget to upload a picture of your plant!",
            }}
          />
        )}
      </Wrapper>
    );
    const label = wrapper.getByText('Upload an image');
    const input = wrapper.getByLabelText('Upload an image') as HTMLInputElement;

    expect(label).toBeDefined();
    expect(input).toBeDefined();
  });

  test('accepts and displays a selected file', async () => {
    const wrapper = render(
      <Wrapper>
        {(methods) => (
          <FileInput
            label="Upload an image"
            name="imgSrc"
            register={methods.register}
            registerOptions={{
              required: "Don't forget to upload a picture of your plant!",
            }}
          />
        )}
      </Wrapper>
    );
    const input = wrapper.getByLabelText('Upload an image') as HTMLInputElement;
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      if (input.files) {
        expect(input.files[0]).toStrictEqual(file);
        expect(input.files).toHaveLength(1);
      }
    });
  });
});

describe('Checkbox tests', () => {
  test('renders label and checkbox correctly', () => {
    const wrapper = render(
      <Wrapper>
        {(methods) => (
          <Checkbox
            label="Agree"
            name="checkbox"
            register={methods.register}
            registerOptions={{
              required: "Don't you agree to sell us this plant? 👉👈",
            }}
          />
        )}
      </Wrapper>
    );
    const label = wrapper.getByText('Agree');
    const checkbox = wrapper.getByLabelText('Agree') as HTMLInputElement;

    expect(label).toBeDefined();
    expect(checkbox).toBeDefined();
    expect(checkbox.checked).toBe(false);
  });

  test('renders error message text correctly', () => {
    const errorStr = 'This is an error message';
    const { getByText } = render(<ErrorMessage errorStr={errorStr} />);
    expect(getByText(errorStr)).toBeDefined();
  });
});

describe('ErrorMessage', () => {
  test('renders without errors', () => {
    const wrapper = render(<ErrorMessage errorStr="This is an error message" />);
    expect(wrapper).toBeTruthy();
  });

  test('renders error message text correctly', () => {
    const errorStr = 'This is an error message';
    const { getByText } = render(<ErrorMessage errorStr={errorStr} />);
    expect(getByText(errorStr)).toBeDefined();
  });
});
