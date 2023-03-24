import React, { createRef } from 'react';
import './forms.css';
import TextInput from './formElements/textInput';
import DateInput from './formElements/dateInput';
import { PlantData, FormState } from 'types/types';
import { plantsData } from '../../data/plants';
import { findMaxId, handleDateChange } from './utils';

export default class Form extends React.Component {
  titleInput: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  dateInput: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();

  state: FormState = {
    errors: [],
    submitted: false,
  };

  validateForm = (titleValue: string, dateInput: string): string[] => {
    const errors: string[] = [];
    if (titleValue.trim() === '') {
      errors.push("Don't forget to give your plant a name!");
    } else if (titleValue.charAt(0) !== titleValue.charAt(0).toUpperCase()) {
      errors.push("Plant's name must start with an uppercase letter");
    }

    if (dateInput === '') {
      errors.push('Please select a delivery date');
    }
    const date = new Date(dateInput);
    const today = new Date();
    if (date < today) {
      errors.push("We haven't perfected time travel yet. Give us at least one day ;)");
    }

    return errors;
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const titleValue = this.titleInput.current?.value || '';
    const dateValue = this.dateInput.current?.value || '';
    const errors = this.validateForm(titleValue, dateValue);

    this.setState({ errors }, () => {
      if (this.state.errors.length === 0) {
        this.setState({ submitted: true });
        const cardData: PlantData = {
          id: findMaxId(plantsData),
          imgSrc: 'none',
          imgAlt: titleValue,
          title: titleValue,
          petFriendly: false,
          price: 666,
          date: handleDateChange(dateValue),
          isEasy: false,
        };
        plantsData.push(cardData);
      } else {
        this.setState({ submitted: false });
      }
    });
  };

  render(): React.ReactNode {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <TextInput label="Plant Name" inputRef={this.titleInput} />
        <DateInput label="Delivery Date" inputRef={this.dateInput} />
        {this.state.errors.length > 0 && (
          <div className="errors">
            {this.state.errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
        {this.state.submitted && <div className="success-message">Your plant has been added!</div>}
        <button type="submit">Submit</button>
      </form>
    );
  }
}
