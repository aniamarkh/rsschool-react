import React from 'react';
import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import Checkbox from './checkboxInput';
import DateInput from './dateInput';
import ErrorMessage from './errorMessage';
import FileInput from './fileInput';
import PriceInput from './priceSelect';
import RadioGroup from './radioGroup';
import TextInput from './textInput';
import { RadioGroupProps, InputProps } from 'types/types';

const radioGroupRefs = [React.createRef<HTMLInputElement>(), React.createRef<HTMLInputElement>()];
type AllProps = InputProps | RadioGroupProps;

type ComponentWithProps<T extends AllProps> = {
  Component: React.ComponentType<T>;
  props: T;
};

describe('Form Inputs - Render errors', () => {
  describe('TextInput', () => {
    test('renders without errors', () => {
      const wrapper = render(<TextInput label="Name" />);
      expect(wrapper).toBeTruthy();
    });
  });

  describe('Checkbox', () => {
    test('renders without errors', () => {
      const wrapper = render(<Checkbox label="I agree to sell you this plant" />);
      expect(wrapper).toBeTruthy();
    });
  });

  describe('DateInput', () => {
    test('renders without errors', () => {
      const wrapper = render(<DateInput label="Delivery Date" />);
      expect(wrapper).toBeTruthy();
    });
  });

  describe('FileInput', () => {
    test('renders without errors', () => {
      const wrapper = render(<FileInput label="Photo Upload" />);
      expect(wrapper).toBeTruthy();
    });
  });

  describe('PriceSelect', () => {
    test('renders without errors', () => {
      const wrapper = render(<PriceInput label="Price" />);
      expect(wrapper).toBeTruthy();
    });
  });

  describe('RadioGroup', () => {
    test('renders without errors', () => {
      const wrapper = render(
        <RadioGroup label="Is pet-friendly?" radioGroupRefs={radioGroupRefs} />
      );
      expect(wrapper).toBeTruthy();
    });
  });
});

describe('Form Inputs Labels', () => {
  test('renders labels correctly', () => {
    const componentsWithProps: ComponentWithProps<AllProps>[] = [
      { Component: Checkbox, props: { label: 'Checkbox label' } },
      { Component: DateInput, props: { label: 'DateInput label' } },
      { Component: TextInput, props: { label: 'TextInput label' } },
      {
        Component: PriceInput,
        props: { label: 'PriceSelect label' },
      },
      { Component: FileInput, props: { label: 'FileInput label' } },
    ];

    componentsWithProps.forEach(({ Component, props }) => {
      const { getByText } = render(React.createElement(Component, props));
      expect(getByText(props.label)).toBeDefined();
    });
  });
});

describe('Form Inputs Correct input type', () => {
  test('renders input with correct type', () => {
    const componentsWithPropsAndType = [
      {
        Component: Checkbox,
        props: { label: 'Checkbox label', inputRef: React.createRef<HTMLInputElement>() },
        type: 'checkbox',
      },
      {
        Component: DateInput,
        props: { label: 'DateInput label', inputRef: React.createRef<HTMLInputElement>() },
        type: 'date',
      },
      {
        Component: TextInput,
        props: { label: 'TextInput label', inputRef: React.createRef<HTMLInputElement>() },
        type: 'text',
      },
      {
        Component: FileInput,
        props: { label: 'FileInput label', inputRef: React.createRef<HTMLInputElement>() },
        type: 'file',
      },
    ];

    componentsWithPropsAndType.forEach(({ Component, props, type }) => {
      const { container } = render(React.createElement(Component, props));
      const input = container.querySelector(`input[type="${type}"]`);
      expect(input).not.toBeNull();
    });
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
