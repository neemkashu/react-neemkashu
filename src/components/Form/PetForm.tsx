import { Component, createRef, FormEventHandler } from 'react';
import { elementRef, PetFormData } from 'src/utils/types';
import { Select } from './Select';
import { ReferencedInput } from './ReferencedInput';
import { DEFAULT_VALUE, Switcher } from './Switcher';

type FormProps = { backData: (x: PetFormData) => void };

export class PetForm extends Component<FormProps> {
  inputText: elementRef<HTMLInputElement>;
  inputDate: elementRef<HTMLInputElement>;
  inputSex: ReturnType<typeof createRef<Switcher>>;
  inputSelect: elementRef<HTMLSelectElement>;
  inputCheckbox: elementRef<HTMLInputElement>;
  inputFile: elementRef<HTMLInputElement>;

  constructor(props: FormProps) {
    super(props);
    this.inputText = createRef<HTMLInputElement>();
    this.inputDate = createRef<HTMLInputElement>();
    this.inputSelect = createRef<HTMLSelectElement>();
    this.inputSex = createRef<Switcher>();
    this.inputCheckbox = createRef<HTMLInputElement>();
    this.inputFile = createRef<HTMLInputElement>();
  }
  handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData: PetFormData = {
      name: this.inputText.current?.value ?? '',
      birth: this.inputDate.current?.value ?? '',
      type: this.inputSelect.current?.value ?? '',
      sex: this.inputSex.current?.getTheChecked() ?? DEFAULT_VALUE,
      isExperienced: this.inputCheckbox.current?.checked ?? false,
      img: this.inputFile.current?.files ?? null,
    };
    this.props.backData(formData);
  };
  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="flex flex-col gap-2 p-3 w-min self-center lg:self-start"
      >
        <h2 className="font-bold text-yellow-800 text-lg text-center">
          {'Please fill out the form'}
        </h2>
        <ReferencedInput
          label={"Pet's name"}
          inputType="text"
          forwardRef={this.inputText}
        />
        <ReferencedInput
          label={"Pet's date of birth"}
          inputType="date"
          forwardRef={this.inputDate}
        />
        <Select
          label={"Pet's type"}
          forwardRef={this.inputSelect}
        />
        <Switcher
          label={"Pet's sex"}
          ref={this.inputSex}
        />
        <ReferencedInput
          label={'Is this your first show?'}
          inputType="checkbox"
          forwardRef={this.inputCheckbox}
        />
        <ReferencedInput
          label={'Upload a photo of the pet'}
          inputType="file"
          forwardRef={this.inputFile}
          accept="image/png, image/jpeg"
        />

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
