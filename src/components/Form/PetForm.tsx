import { useForm } from 'react-hook-form';
import { Select } from './Select';
import { ReferencedInput } from './ReferencedInput';
import {
  ErrorMessages,
  PetFormData,
  validateName,
  vilidateBirth,
  vilidateImage,
} from './formChecker';
import { FieldErrorMessage } from './FieldErrorMessage';
import { Switcher } from './Switcher';

type FormProps = { backData: (x: PetFormData) => void };

export const PetForm = ({ backData }: FormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PetFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit = (formData: PetFormData) => {
    backData(formData);
    reset();
  };

  return (
    <form
      name=""
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-1 tiny:p-3 h-min w-min border-2 border-dotted border-yellow-600 rounded-lg
         justify-self-center lg:self-start"
    >
      <h2 className="font-bold text-yellow-800 text-lg text-center">Please fill out the form</h2>
      <ReferencedInput
        label={"Pet's name"}
        inputType="text"
        register={register('name', {
          required: 'Write the name',
          validate: { capitalLetter: validateName },
        })}
      />
      <FieldErrorMessage message={errors.name?.message || (errors.name && ErrorMessages.name)} />
      <ReferencedInput
        label={"Pet's date of birth"}
        inputType="date"
        register={register('birth', {
          validate: { isNotFuture: vilidateBirth },
        })}
      />
      <FieldErrorMessage message={errors.birth && ErrorMessages.birth} />
      <Select
        label={"Pet's type"}
        register={register('type', { required: true })}
      />
      <FieldErrorMessage message={errors.type && ErrorMessages.type} />
      <Switcher
        label={"Pet's sex"}
        register={register('sex', { required: true })}
      />
      <FieldErrorMessage message={errors.sex && ErrorMessages.sex} />
      <ReferencedInput
        label="I have read and agree to the rules of the show"
        inputType="checkbox"
        register={register('isExperienced', { required: true })}
      />
      <FieldErrorMessage message={errors.isExperienced && ErrorMessages.isExperienced} />
      <ReferencedInput
        label="Upload a photo of the pet"
        inputType="file"
        register={register('img', {
          validate: {
            nonEmpty: vilidateImage,
          },
        })}
        accept="image/png, image/jpeg"
      />
      <FieldErrorMessage message={errors.img && ErrorMessages.img} />

      <button
        className=" self-center
          bg-zinc-500 hover:bg-zinc-400 text-white font-bold
          py-2 px-4 border-b-4 border-zinc-700 hover:border-zinc-500 rounded
          duration-300 ease-in-out"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
