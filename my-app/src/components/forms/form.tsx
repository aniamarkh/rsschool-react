import React, { createRef } from 'react';
import './forms.css';
import TextInput from './formElements/textInput';
import DateInput from './formElements/dateInput';
import PriceSelect from './formElements/priceInput';
import RadioGroup from './formElements/radioGroup';
import FileInput from './formElements/fileInput';
import Checkbox from './formElements/checkboxInput';
import ErrorMessage from './formElements/errorMessage';
import { PlantData, FormState } from 'types/types';
import { plantsData } from '../../data/plants';
import { findMaxId, handleDateChange } from './utils';

export default class Form extends React.Component<FormState> {
  titleInput: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  dateInput: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  priceSelect: React.RefObject<HTMLSelectElement> = createRef<HTMLSelectElement>();
  imgUpload: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  checkboxInput: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  state: FormState = {
    errors: [],
    submitted: false,
    formData: {
      id: 0,
      imgSrc: '',
      imgAlt: '',
      title: '',
      petFriendly: null,
      price: 0,
      date: '',
    },
  };

  validateForm = (formData: PlantData): string[] => {
    const errors: string[] = [];

    if (formData.title.trim() === '') {
      errors.push("Don't forget to give your plant a name!");
    } else if (formData.title.charAt(0) !== formData.title.charAt(0).toUpperCase()) {
      errors.push("Plant's name must start with an uppercase letter");
    }

    if (formData.date === '') {
      errors.push('Please select a delivery date');
    }
    const date = new Date(this.dateInput.current?.value || '');
    const today = new Date();
    if (date < today) {
      errors.push('Give us at least one day ;)');
    }

    if (!formData.price) {
      errors.push('Please select price');
    }

    if (formData.petFriendly === null) {
      errors.push('Please tell if plant is pet-friendly');
    }

    if (formData.imgSrc === null) {
      errors.push('Upload a photo');
    }

    if (!this.checkboxInput.current?.checked) {
      errors.push('Please agree to sell us this plant');
    }
    return errors;
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const imgSrc = this.handleImgUpload();
    this.setState(
      (prevState: FormState) => ({
        formData: {
          ...prevState.formData,
          id: findMaxId(plantsData),
          imgSrc: imgSrc,
          imgAlt: this.titleInput.current?.value || '',
          title: this.titleInput.current?.value || '',
          price: Number(this.priceSelect.current?.value),
          date: handleDateChange(this.dateInput.current?.value || ''),
        },
      }),
      () => {
        const errors = this.validateForm(this.state.formData);
        this.setState({ errors }, () => {
          if (this.state.errors.length === 0) {
            this.setState({ submitted: true });
            plantsData.push(this.state.formData);
          } else {
            this.setState({ submitted: false });
          }
        });
      }
    );
  };

  handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const petFriendlyValue = Number(event.target.value);
    this.setState((prevState: FormState) => ({
      formData: {
        ...prevState.formData,
        petFriendly: petFriendlyValue === 1,
      },
    }));
  };

  handleImgUpload = (): string | null => {
    const imgInputCurr = this.imgUpload.current;
    if (imgInputCurr && imgInputCurr.files && imgInputCurr.files.length) {
      return URL.createObjectURL(imgInputCurr.files[0]);
    } else {
      return null;
    }
  };

  render(): React.ReactNode {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h3>🌿 Tell me about your plant 🌱</h3>
        <TextInput label="Plant Name" inputRef={this.titleInput} />
        <DateInput label="Delivery Date" inputRef={this.dateInput} />
        <PriceSelect label="Price" selectRef={this.priceSelect} />
        <RadioGroup label="What about pets?" onChange={this.handleRadioChange} />
        <FileInput label="Photo Upload" inputRef={this.imgUpload} />
        <Checkbox label="I agree to sell you this plant" inputRef={this.checkboxInput} />
        {this.state.errors.length > 0 && (
          <div className="errors">
            {this.state.errors.map((error, index) => (
              <ErrorMessage key={index} errorStr={error} />
            ))}
          </div>
        )}
        {this.state.submitted && <div className="success-message">Your plant has been added!</div>}
        <button type="submit">Submit</button>
      </form>
    );
  }
}
