import React, { createRef } from 'react';
import './forms.css';
import TextInput from './formElements/textInput';
import DateInput from './formElements/dateInput';
import PriceSelect from './formElements/priceSelect';
import RadioGroup from './formElements/radioGroup';
import FileInput from './formElements/fileInput';
import CheckboxInput from './formElements/checkboxInput';
import ErrorMessage from './formElements/errorMessage';
import CardsList from '../cardsList/cardsList';
import { PlantData, FormState, ErrorsState } from 'types/types';
import { plantsData } from '../../data/formData';
import { findMaxId, handleDateChange } from './utils';

export default class Form extends React.Component {
  titleInput: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  dateInput: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  priceSelect: React.RefObject<HTMLSelectElement> = createRef<HTMLSelectElement>();
  radioGroupRefs: React.RefObject<HTMLInputElement>[] = [
    createRef<HTMLInputElement>(),
    createRef<HTMLInputElement>(),
  ];
  imgUpload: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  checkboxInput: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  state: FormState = {
    errors: {
      title: '',
      date: '',
      price: '',
      petFriendly: '',
      imgSrc: '',
      checkbox: '',
    },
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

  validateForm = (formData: PlantData): ErrorsState => {
    const errors: ErrorsState = {
      title: '',
      date: '',
      price: '',
      petFriendly: '',
      imgSrc: '',
      checkbox: '',
    };

    if (formData.title.trim() === '') {
      errors.title = "Don't forget to give your plant a name!";
    } else if (formData.title.charAt(0) !== formData.title.charAt(0).toUpperCase()) {
      errors.title = 'Start with an uppercase letter';
    }

    if (formData.date === '') {
      errors.date = 'Select a delivery date';
    }
    const date = new Date(this.dateInput.current?.value || '');
    const today = new Date();
    if (date < today) {
      errors.date = 'Give us at least one day ;)';
    }

    if (!formData.price) {
      errors.price = 'Please select price';
    }

    if (formData.petFriendly === null) {
      errors.petFriendly = "Tell if your plant is pet-friendly, it's important";
    }

    if (formData.imgSrc === null) {
      errors.imgSrc = 'Upload a photo, we need it';
    }

    if (!this.checkboxInput.current?.checked) {
      errors.checkbox = "Don't you agree to sell us this plant? 👉👈";
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
          if (Object.values(this.state.errors).every((value) => value === '')) {
            plantsData.push(this.state.formData);
            this.resetForm();
            this.setState({ submitted: true });
          } else {
            this.setState({ submitted: false });
          }
        });
      }
    );
  };

  resetForm = () => {
    if (this.titleInput.current) this.titleInput.current.value = '';
    if (this.dateInput.current) this.dateInput.current.value = '';
    if (this.priceSelect.current) this.priceSelect.current.value = '';
    this.radioGroupRefs.forEach((ref) => {
      if (ref.current) ref.current.checked = false;
    });
    if (this.imgUpload.current) this.imgUpload.current.value = '';
    if (this.checkboxInput.current) this.checkboxInput.current.checked = false;

    this.setState((prevState: FormState) => ({
      formData: {
        ...prevState.formData,
        id: 0,
        imgSrc: '',
        imgAlt: '',
        title: '',
        petFriendly: null,
        price: 0,
        date: '',
      },
      errors: {
        title: '',
        date: '',
        price: '',
        petFriendly: '',
        imgSrc: '',
        checkbox: '',
      },
    }));
  };

  handleRadioChange = () => {
    const petFriendlyValue = this.radioGroupRefs[1].current?.checked ? 1 : 0;
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
    const stateErr = this.state.errors;
    return (
      <div className="form-container">
        <form role="form" className="form" data-testid="form" onSubmit={this.handleSubmit}>
          <h3>🌿 Tell me about your plant 🌱</h3>
          <TextInput label="Name" inputRef={this.titleInput} />
          {stateErr.title && <ErrorMessage errorStr={stateErr.title} />}

          <DateInput label="Delivery Date" inputRef={this.dateInput} />
          {stateErr.date && <ErrorMessage errorStr={stateErr.date} />}

          <PriceSelect label="Price" selectRef={this.priceSelect} />
          {stateErr.price && <ErrorMessage errorStr={stateErr.price} />}

          <RadioGroup
            label="Is pet-friendly?"
            radioGroupRefs={this.radioGroupRefs}
            onChange={this.handleRadioChange}
          />
          {stateErr.petFriendly && <ErrorMessage errorStr={stateErr.petFriendly} />}
          <FileInput label="Photo Upload" inputRef={this.imgUpload} />
          {stateErr.imgSrc && <ErrorMessage errorStr={stateErr.imgSrc} />}
          <CheckboxInput label="I agree to sell you this plant" inputRef={this.checkboxInput} />
          {stateErr.checkbox && <ErrorMessage errorStr={stateErr.checkbox} />}

          {this.state.submitted && (
            <div className="success-message">Your plant has been added!</div>
          )}
          <button type="submit">Submit</button>
        </form>
        <CardsList data={plantsData} />
      </div>
    );
  }
}
