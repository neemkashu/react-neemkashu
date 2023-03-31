import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Select } from './Select';
import { ReferencedInput } from './ReferencedInput';
// import { Switcher } from './Switcher';
import { checkFormIsValid, ErrorMessages, getErrorMessages, PetFormData } from './formChecker';
import { FieldErrorMessage } from './FieldErrorMessage';
import { mapOverObject } from '../../utils/helpers';
import { Switcher } from './Switcher';

type FormProps = { backData: (x: PetFormData) => void };

const INVITE_CAPTION = 'Please fill out the form';
const AGREE_LABEL = 'I have read and agree to the rules of the show';
const UPLOAD_CAPTION = 'Upload a photo of the pet';
const SUBMIT_CAPTION = 'Submit';

const EmptyMessages = mapOverObject(ErrorMessages, (accum, key) => {
  accum[key] = '';
  return accum;
});

export const PetForm = ({ backData }: FormProps) => {
  const [errorMessages, setErrorMessages] = useState(EmptyMessages);

  const { register, handleSubmit, reset } = useForm<PetFormData>();

  const onSubmit = (formData: PetFormData) => {
    if (checkFormIsValid(formData)) {
      backData(formData);
      setErrorMessages(EmptyMessages);
      reset();
    } else {
      setErrorMessages(getErrorMessages(formData));
    }
  };

  return (
    <form
      name=""
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-1 tiny:p-3 h-min w-min border-2 border-dotted border-yellow-600 rounded-lg
         justify-self-center lg:self-start"
    >
      <h2 className="font-bold text-yellow-800 text-lg text-center">{INVITE_CAPTION}</h2>
      <ReferencedInput
        label={"Pet's name"}
        inputType="text"
        register={register('name')}
      />
      <FieldErrorMessage message={errorMessages.name} />
      <ReferencedInput
        label={"Pet's date of birth"}
        inputType="date"
        register={register('birth')}
      />
      <FieldErrorMessage message={errorMessages.birth} />
      <Select
        label={"Pet's type"}
        register={register}
      />
      <FieldErrorMessage message={errorMessages.type} />
      <Switcher
        label={"Pet's sex"}
        register={register}
      />
      <FieldErrorMessage message={errorMessages.sex} />
      <ReferencedInput
        label={AGREE_LABEL}
        inputType="checkbox"
        register={register('isExperienced')}
      />
      <FieldErrorMessage message={errorMessages.isExperienced} />
      <ReferencedInput
        label={UPLOAD_CAPTION}
        inputType="file"
        register={register('img')}
        accept="image/png, image/jpeg"
      />
      <FieldErrorMessage message={errorMessages.img} />

      <button
        className=" self-center
          bg-zinc-500 hover:bg-zinc-400 text-white font-bold
          py-2 px-4 border-b-4 border-zinc-700 hover:border-zinc-500 rounded
          duration-300 ease-in-out"
        type="submit"
      >
        {SUBMIT_CAPTION}
      </button>
    </form>
  );
};
