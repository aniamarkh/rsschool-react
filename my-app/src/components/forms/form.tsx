import React from 'react';
import './forms.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextInput from './formElements/textInput';
import DateInput from './formElements/dateInput';
import PriceSelect from './formElements/priceSelect';
import RadioGroup from './formElements/radioGroup';
import FileInput from './formElements/fileInput';
import CheckboxInput from './formElements/checkboxInput';
import ErrorMessage from './formElements/errorMessage';
import { PlantData, FormValues } from 'types/types';
import { findMaxId, handleDateChange } from './utils';

interface FormProps {
  cards: PlantData[];
  updateCards: (card: PlantData) => void;
}

export default function Form({ cards, updateCards }: FormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    const newCard: PlantData = {
      id: findMaxId(cards),
      imgSrc: URL.createObjectURL(data.imgSrc[0]),
      imgAlt: data.title,
      title: data.title,
      petFriendly: data.petFriendly ? true : false,
      price: Number(data.price),
      date: handleDateChange(data.date),
    };
    updateCards(newCard);
    reset();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="form" role="form" data-testid="form">
        <h3>🌿 Tell me about your plant 🌱</h3>
        <TextInput
          label="Name"
          name="title"
          register={register}
          registerOptions={{
            required: "Don't forget to give your plant a name!",
            validate: (value) =>
              (value as string).charAt(0) === (value as string).charAt(0).toUpperCase() ||
              'Start with an uppercase letter',
          }}
        />
        {errors.title && <ErrorMessage errorStr={errors.title.message} />}
        <DateInput
          label="Delivery Date"
          name="date"
          register={register}
          registerOptions={{
            required: 'Select a delivery date',
            validate: (value) => {
              const date = new Date(value as string);
              const today = new Date();
              return date > today || 'Give us at least one day ;)';
            },
          }}
        />
        {errors.date && <ErrorMessage errorStr={errors.date.message} />}
        <PriceSelect
          label="Price"
          name="price"
          register={register}
          registerOptions={{
            required: 'Select a price value',
            validate: (value) => value !== 'default' || 'Select a price value',
          }}
        />
        {errors.price && <ErrorMessage errorStr={errors.price.message} />}
        <RadioGroup
          label="Is pet-friendly?"
          name="petFriendly"
          register={register}
          registerOptions={{
            required: "Tell if your plant is pet-friendly, it's important",
          }}
        />
        {errors.petFriendly && <ErrorMessage errorStr={errors.petFriendly.message} />}
        <FileInput
          label="Upload an image"
          name="imgSrc"
          register={register}
          registerOptions={{
            required: "Don't forget to upload a picture of your plant!",
          }}
        />
        {errors.imgSrc && <ErrorMessage errorStr={errors.imgSrc.message} />}
        <CheckboxInput
          label="I agree to sell you this plant"
          name="checkbox"
          register={register}
          registerOptions={{
            required: "Don't you agree to sell us this plant? 👉👈",
          }}
        />
        {errors.checkbox && <ErrorMessage errorStr={errors.checkbox.message} />}
        {isSubmitSuccessful && <div className="success-message">Your plant has been added!</div>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
