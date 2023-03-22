import { Component, createRef, FormEventHandler } from 'react';
import { elementRef } from 'src/utils/types';
import { Select } from './Select';
import { ReferencedInput } from './ReferencedInput';
import { Switcher } from './Switcher';

export class PetForm extends Component<Record<string, never>> {
  inputText: elementRef<HTMLInputElement>;
  inputDate: elementRef<HTMLInputElement>;
  inputSex: ReturnType<typeof createRef<Switcher>>;
  inputSelect: elementRef<HTMLSelectElement>;

  constructor(props: Record<string, never>) {
    super(props);
    this.inputText = createRef<HTMLInputElement>();
    this.inputDate = createRef<HTMLInputElement>();
    this.inputSelect = createRef<HTMLSelectElement>();
    this.inputSex = createRef<Switcher>();
  }
  handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    this.inputSex.current?.getTheChecked();
    const formData = {
      inputVal: this.inputText.current?.value,
      dateVal: this.inputDate.current?.value,
      selectVal: this.inputSelect.current?.value,
      sexVal: this.inputSex.current?.getTheChecked(),
    };
    console.log(formData);
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="flex flex-col gap-2 p-3">
        <h2 className="font-bold text-yellow-800 text-lg">
          {'Please, complete all fields of the form'}
        </h2>
        <ReferencedInput label={"Pet's Name"} inputType="text" forwardRef={this.inputText} />
        <ReferencedInput
          label={"Pet's Date of Birth"}
          inputType="date"
          forwardRef={this.inputDate}
        />
        <Select label={"Pet's Type"} forwardRef={this.inputSelect} />
        <Switcher label={"Pet's Sex"} ref={this.inputSex} />

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
