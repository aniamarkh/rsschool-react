import React, { ReactNode } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { describe, test, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Checkbox from './checkboxInput';
import DateInput from './dateInput';
import ErrorMessage from './errorMessage';
import FileInput from './fileInput';
import RadioGroup from './radioGroup';
import GenreSelect from './selectGenre';
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
            label="Title"
            name="title"
            register={methods.register}
            registerOptions={{
              required: "Don't forget to give your movie a title!",
              validate: (value) =>
                (value as string).charAt(0) === (value as string).charAt(0).toUpperCase() ||
                'Start with an uppercase letter',
            }}
          />
        )}
      </Wrapper>
    );
    const label = wrapper.getByText('Title');
    const input = wrapper.getByLabelText('Title') as HTMLInputElement;

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
            label="Release Date"
            name="date"
            register={methods.register}
            registerOptions={{
              required: 'Select a release date',
              validate: (value) => {
                const date = new Date(value as string);
                const today = new Date();
                return date > today || 'Select a valid release date in the past';
              },
            }}
          />
        )}
      </Wrapper>
    );
    const label = wrapper.getByText('Release Date');
    const input = wrapper.getByLabelText('Release Date') as HTMLInputElement;

    expect(label).toBeDefined();
    expect(input).toBeDefined();
  });
});

describe('PriceSelect tests', () => {
  test('renders input and label correctly', () => {
    const wrapper = render(
      <Wrapper>
        {(methods) => (
          <GenreSelect
            label="Choose a genre"
            name="genre"
            register={methods.register}
            registerOptions={{
              required: 'Please choose a genre for your movie',
              validate: (value) => value !== 'default' || 'Please choose a genre for your movie',
            }}
          />
        )}
      </Wrapper>
    );
    const label = wrapper.getByText('Choose a genre');
    const input = wrapper.getByLabelText('Choose a genre') as HTMLInputElement;

    expect(label).toBeDefined();
    expect(input).toBeDefined();
  });

  test('displays options and selects a value', async () => {
    const wrapper = render(
      <Wrapper>
        {(methods) => (
          <GenreSelect
            label="Choose a genre"
            name="genre"
            register={methods.register}
            registerOptions={{
              required: 'Please choose a genre for your movie',
              validate: (value) => value !== 'default' || 'Please choose a genre for your movie',
            }}
          />
        )}
      </Wrapper>
    );
    const input = wrapper.getByLabelText('Choose a genre') as HTMLSelectElement;

    expect(input.options).toHaveLength(4);

    fireEvent.change(input, { target: { value: 'Comedy' } });

    await waitFor(() => {
      expect(input.value).toBe('Comedy');
    });
  });
});

describe('RadioGroup tests', () => {
  test('renders input and label correctly', () => {
    const wrapper = render(
      <Wrapper>
        {(methods) => (
          <RadioGroup
            label="Is it another bad sequel?"
            name="isSequel"
            register={methods.register}
            registerOptions={{
              required: `Tell if this movie is another bad sequel, it's important`,
            }}
          />
        )}
      </Wrapper>
    );
    const label = wrapper.getByText('Is it another bad sequel?');
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
            label="Upload a poster"
            name="imgSrc"
            register={methods.register}
            registerOptions={{
              required: "Don't forget to upload a poster for your movie!",
            }}
          />
        )}
      </Wrapper>
    );
    const label = wrapper.getByText('Upload a poster');
    const input = wrapper.getByLabelText('Upload a poster') as HTMLInputElement;

    expect(label).toBeDefined();
    expect(input).toBeDefined();
  });

  test('accepts and displays a selected file', async () => {
    const wrapper = render(
      <Wrapper>
        {(methods) => (
          <FileInput
            label="Upload a poster"
            name="imgSrc"
            register={methods.register}
            registerOptions={{
              required: "Don't forget to upload a poster for your movie!",
            }}
          />
        )}
      </Wrapper>
    );
    const input = wrapper.getByLabelText('Upload a poster') as HTMLInputElement;
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
            label="I agree to add this movie"
            name="checkbox"
            register={methods.register}
            registerOptions={{
              required: "Don't you agree to add this movie? 👉👈",
            }}
          />
        )}
      </Wrapper>
    );
    const label = wrapper.getByText('I agree to add this movie');
    const checkbox = wrapper.getByLabelText('I agree to add this movie') as HTMLInputElement;

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
