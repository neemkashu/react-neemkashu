import { FormEventHandler, useRef, useState } from 'react';
import { Select } from './Select';
import { InputWithGetter, ReferencedInput } from './ReferencedInput';
import { Switcher } from './Switcher';
import { checkFormIsValid, ErrorMessages, getErrorMessages, PetFormData } from './formChecker';
import { FieldErrorMessage } from './FieldErrorMessage';
import { mapOverObject } from '../../utils/helpers';

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
  const inputText = useRef<InputWithGetter<string>>(null);
  const inputDate = useRef<InputWithGetter<string>>(null);
  const inputSelect = useRef<InputWithGetter<string>>(null);
  const inputSex = useRef<InputWithGetter<string>>(null);
  const inputCheckbox = useRef<InputWithGetter<boolean>>(null);
  const inputFile = useRef<InputWithGetter<FileList | null>>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [errorMessages, setErrorMessages] = useState(EmptyMessages);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const formData: PetFormData = {
      name: inputText.current?.getUserAnswer() ?? '',
      birth: inputDate.current?.getUserAnswer() ?? '',
      type: inputSelect.current?.getUserAnswer() ?? '',
      sex: inputSex.current?.getUserAnswer() ?? '',
      isExperienced: inputCheckbox.current?.getUserAnswer() ?? false,
      img: inputFile.current?.getUserAnswer() ?? null,
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
        answerRef={inputText}
      />
      <FieldErrorMessage message={errorMessages.name} />
      <ReferencedInput
        label={"Pet's date of birth"}
        inputType="date"
        answerRef={inputDate}
      />
      <FieldErrorMessage message={errorMessages.birth} />
      <Select
        label={"Pet's type"}
        answerRef={inputSelect}
      />
      <FieldErrorMessage message={errorMessages.type} />
      <Switcher
        label={"Pet's sex"}
        answerRef={inputSex}
      />
      <FieldErrorMessage message={errorMessages.sex} />
      <ReferencedInput
        label={AGREE_LABEL}
        inputType="checkbox"
        answerRef={inputCheckbox}
      />
      <FieldErrorMessage message={errorMessages.isExperienced} />
      <ReferencedInput
        label={UPLOAD_CAPTION}
        inputType="file"
        answerRef={inputFile}
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
