import React from 'react';
import './forms.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextInput from './formElements/textInput';
import DateInput from './formElements/dateInput';
import GenreSelect from './formElements/selectGenre';
import RadioGroup from './formElements/radioGroup';
import FileInput from './formElements/fileInput';
import CheckboxInput from './formElements/checkboxInput';
import ErrorMessage from './formElements/errorMessage';
import { CardData, FormValues } from 'types/types';
import { findMaxId, handleDateChange } from './utils';

interface FormProps {
  cards: CardData[];
  updateCards: (card: CardData) => void;
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
    const newCard: CardData = {
      id: findMaxId(cards),
      imgSrc: URL.createObjectURL(data.imgSrc[0]),
      imgAlt: data.title,
      title: data.title,
      isSequel: data.isSequel ? true : false,
      genre: data.genre,
      date: handleDateChange(data.date),
    };
    updateCards(newCard);
    reset();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="form" role="form" data-testid="form">
        <h3>Want to add a movie? 🎬</h3>
        <TextInput
          label="Title"
          name="title"
          register={register}
          registerOptions={{
            required: "Don't forget to give your movie a title!",
            validate: (value) =>
              (value as string).charAt(0) === (value as string).charAt(0).toUpperCase() ||
              'Start with an uppercase letter',
          }}
        />
        {errors.title && <ErrorMessage errorStr={errors.title.message} />}
        <DateInput
          label="Release Date"
          name="date"
          register={register}
          registerOptions={{
            required: 'Select a release date',
            validate: (value) => {
              const date = new Date(value as string);
              const today = new Date();
              return date < today || 'Select a valid release date in the past';
            },
          }}
        />
        {errors.date && <ErrorMessage errorStr={errors.date.message} />}
        <GenreSelect
          label="Choose a genre"
          name="genre"
          register={register}
          registerOptions={{
            required: 'Please choose a genre for your movie',
            validate: (value) => value !== 'default' || 'Please choose a genre for your movie',
          }}
        />
        {errors.genre && <ErrorMessage errorStr={errors.genre.message} />}
        <RadioGroup
          label="Is it another bad sequel?"
          name="isSequel"
          register={register}
          registerOptions={{
            required: "Tell if this movie is another bad sequel, it's important",
          }}
        />
        {errors.isSequel && <ErrorMessage errorStr={errors.isSequel.message} />}
        <FileInput
          label="Upload a poster"
          name="imgSrc"
          register={register}
          registerOptions={{
            required: "Don't forget to upload a poster for your movie!",
          }}
        />
        {errors.imgSrc && <ErrorMessage errorStr={errors.imgSrc.message} />}
        <CheckboxInput
          label="I agree to add this movie"
          name="checkbox"
          register={register}
          registerOptions={{
            required: "Don't you agree to add this movie? 👉👈",
          }}
        />
        {errors.checkbox && <ErrorMessage errorStr={errors.checkbox.message} />}
        {isSubmitSuccessful && <div className="success-message">Your movie has been added!</div>}

        <button className="form__submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
