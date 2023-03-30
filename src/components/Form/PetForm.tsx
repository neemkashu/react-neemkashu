import { Component, createRef, FormEventHandler, useState } from 'react';
import { Select } from './Select';
import { ReferencedInput } from './ReferencedInput';
import { Switcher } from './Switcher';
import {
  checkFormIsValid,
  ErrorMessages,
  FieldMessages,
  getErrorMessages,
  PetFormData,
} from './formChecker';
import { FieldErrorMessage } from './FieldErrorMessage';

type FormProps = { backData: (x: PetFormData) => void };

const INVITE_CAPTION = 'Please fill out the form';
const AGREE_LABEL = 'I have read and agree to the rules of the show';
const UPLOAD_CAPTION = 'Upload a photo of the pet';
const SUBMIT_CAPTION = 'Submit';

const EmptyMessages = Object.keys(ErrorMessages).reduce<FieldMessages>((accum, key) => {
  const keyErr = key as keyof FieldMessages;
  accum[keyErr] = '';
  return accum;
}, {} as FieldMessages);

export const PetForm = ({ backData }: FormProps) => {
  const inputText = createRef<typeof ReferencedInput<string>>();
  const inputDate = createRef<typeof ReferencedInput<string>>();
  const inputSelect = createRef<Select>();
  const inputSex = createRef<typeof Switcher>();
  const inputCheckbox = createRef<typeof ReferencedInput<boolean>>();
  const inputFile = createRef<typeof ReferencedInput<FileList | null>>();
  const formRef = createRef<HTMLFormElement>();

  const [errorMessages, setErrorMessages] = useState(EmptyMessages);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData: PetFormData = {
      name: inputText.current?.getAnswer() ?? '',
      birth: inputDate.current?.getAnswer() ?? '',
      type: inputSelect.current?.getAnswer() ?? '',
      sex: inputSex.current?.getAnswer() ?? '',
      isExperienced: inputCheckbox.current?.getAnswer() ?? false,
      img: inputFile.current?.getAnswer() ?? null,
    };

    if (checkFormIsValid(formData)) {
      backData(formData);
      setErrorMessages(EmptyMessages);
      formRef.current?.reset();
    } else {
      setErrorMessages(getErrorMessages(formData));
    }
  };

  return (
    <form
      name=""
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-1 tiny:p-3 h-min w-min border-2 border-dotted border-yellow-600 rounded-lg
         justify-self-center lg:self-start"
    >
      <h2 className="font-bold text-yellow-800 text-lg text-center">{INVITE_CAPTION}</h2>
      <ReferencedInput
        label={"Pet's name"}
        inputType="text"
        ref={inputText}
      />
      <FieldErrorMessage message={errorMessages.name} />
      <ReferencedInput
        label={"Pet's date of birth"}
        inputType="date"
        ref={inputDate}
      />
      <FieldErrorMessage message={errorMessages.birth} />
      <Select
        label={"Pet's type"}
        ref={inputSelect}
      />
      <FieldErrorMessage message={errorMessages.type} />
      <Switcher
        label={"Pet's sex"}
        ref={inputSex}
      />
      <FieldErrorMessage message={errorMessages.sex} />
      <ReferencedInput
        label={AGREE_LABEL}
        inputType="checkbox"
        ref={inputCheckbox}
      />
      <FieldErrorMessage message={errorMessages.isExperienced} />
      <ReferencedInput
        label={UPLOAD_CAPTION}
        inputType="file"
        ref={inputFile}
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
