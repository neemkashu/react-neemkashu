import { Component, createRef, FormEventHandler } from 'react';
import { inputRef } from 'src/utils/types';
import { TextInput } from './TextInput';

export class Form extends Component<Record<string, never>> {
  inputText: inputRef;

  constructor(props: Record<string, never>) {
    super(props);
    this.inputText = createRef<HTMLInputElement>();
  }
  handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    console.log(this.inputText.current?.value);
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="flex flex-col gap-2 p-3">
        <h2 className="font-bold text-yellow-800 text-lg">
          Please, complete all fields of the form
        </h2>
        <TextInput forwardRef={this.inputText} />
        <button
          className=" self-center
          bg-zinc-500 hover:bg-zinc-400 text-white font-bold
          py-2 px-4 border-b-4 border-zinc-700 hover:border-zinc-500 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  }
}
