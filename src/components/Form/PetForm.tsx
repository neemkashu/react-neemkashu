import { Component, createRef, FormEventHandler } from 'react';
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
type messages = { errorMessages: FieldMessages };

const EmptyMessages = Object.keys(ErrorMessages).reduce<FieldMessages>((accum, key) => {
  const keyErr = key as keyof FieldMessages;
  accum[keyErr] = '';
  return accum;
}, {} as FieldMessages);

export class PetForm extends Component<FormProps, messages> {
  constructor(props: FormProps) {
    super(props);
    this.state = { errorMessages: EmptyMessages };
  }
  inputText = createRef<ReferencedInput<string>>();
  inputDate = createRef<ReferencedInput<string>>();
  inputSelect = createRef<Select>();
  inputSex = createRef<Switcher>();
  inputCheckbox = createRef<ReferencedInput<boolean>>();
  inputFile = createRef<ReferencedInput<FileList | null>>();
  formRef = createRef<HTMLFormElement>();

  handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData: PetFormData = {
      name: this.inputText.current?.getAnswer() ?? '',
      birth: this.inputDate.current?.getAnswer() ?? '',
      type: this.inputSelect.current?.getAnswer() ?? '',
      sex: this.inputSex.current?.getAnswer() ?? '',
      isExperienced: this.inputCheckbox.current?.getAnswer() ?? false,
      img: this.inputFile.current?.getAnswer() ?? null,
    };

    if (checkFormIsValid(formData)) {
      this.props.backData(formData);
      this.setState({ errorMessages: EmptyMessages });
      this.formRef.current?.reset();
    } else {
      this.setState({ errorMessages: getErrorMessages(formData) });
    }
  };
  render() {
    return (
      <form
        name=""
        ref={this.formRef}
        onSubmit={this.handleSubmit}
        className="flex flex-col gap-4 p-1 tiny:p-3 h-min w-min border-2 border-dotted border-yellow-600 rounded-lg
         justify-self-center lg:self-start"
      >
        <h2 className="font-bold text-yellow-800 text-lg text-center">
          {'Please fill out the form'}
        </h2>
        <ReferencedInput
          label={"Pet's name"}
          inputType="text"
          ref={this.inputText}
        />
        <FieldErrorMessage message={this.state.errorMessages.name} />
        <ReferencedInput
          label={"Pet's date of birth"}
          inputType="date"
          ref={this.inputDate}
        />
        <FieldErrorMessage message={this.state.errorMessages.birth} />
        <Select
          label={"Pet's type"}
          ref={this.inputSelect}
        />
        <FieldErrorMessage message={this.state.errorMessages.type} />
        <Switcher
          label={"Pet's sex"}
          ref={this.inputSex}
        />
        <FieldErrorMessage message={this.state.errorMessages.sex} />
        <ReferencedInput
          label={'I have read and agree to the rules of the show'}
          inputType="checkbox"
          ref={this.inputCheckbox}
        />
        <FieldErrorMessage message={this.state.errorMessages.isExperienced} />
        <ReferencedInput
          label={'Upload a photo of the pet'}
          inputType="file"
          ref={this.inputFile}
          accept="image/png, image/jpeg"
        />
        <FieldErrorMessage message={this.state.errorMessages.img} />

        <button
          className=" self-center
          bg-zinc-500 hover:bg-zinc-400 text-white font-bold
          py-2 px-4 border-b-4 border-zinc-700 hover:border-zinc-500 rounded
          duration-300 ease-in-out"
          type="submit"
        >
          {'Submit'}
        </button>
      </form>
    );
  }
}
