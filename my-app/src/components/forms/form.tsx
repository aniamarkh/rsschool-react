import React, { createRef } from 'react';
import './forms.css';
import TextInput from './formElements/textInput';
import { PlantData, FormState } from 'types/types';
import { plantsData } from '../../data/plants';

export default class Form extends React.Component {
  titleInput: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();

  state: FormState = {
    errors: [],
    submitted: false,
  };

  validateForm = (titleValue: string): string[] => {
    const errors: string[] = [];
    if (titleValue.trim() === '') {
      errors.push("Don't forget to give your plant a name!");
    } else if (titleValue.charAt(0) !== titleValue.charAt(0).toUpperCase()) {
      errors.push("Plant's name must start with an uppercase letter");
    }
    return errors;
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const titleValue = this.titleInput.current?.value || '';

    const errors = this.validateForm(titleValue);

    this.setState({ errors }, () => {
      if (this.state.errors.length === 0) {
        this.setState({ submitted: true });
        const cardData: PlantData = {
          id: this.findMaxId(),
          imgSrc: 'none',
          imgAlt: titleValue,
          title: titleValue,
          petFriendly: false,
          price: 666,
          date: '69.06.9069',
          isEasy: false,
        };
        plantsData.push(cardData);
      }
    });
  };

  findMaxId(): number {
    return (
      Math.max(
        ...plantsData.map((object: PlantData) => {
          return object.id;
        })
      ) + 1
    );
  }

  render(): React.ReactNode {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <TextInput label="Plant Name" inputRef={this.titleInput} />
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
