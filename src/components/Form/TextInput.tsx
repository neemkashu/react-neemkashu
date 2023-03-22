import { Component } from 'react';
import { inputRef } from 'src/utils/types';

type TextInputProps = {
  forwardRef: inputRef;
};

export class TextInput extends Component<TextInputProps> {
  input: inputRef;

  constructor(props: TextInputProps) {
    super(props);
    this.input = props.forwardRef;
  }
  render() {
    const { forwardRef } = this.props;
    return (
      <div>
        <label>
          {'Pet name '}
          <input
            ref={forwardRef}
            type="text"
            className=" m-0 rounded border-2 border-solid border-yellow-900
          max-w-xs h-6 px-1 bg-white bg-no-repeat text-base
           duration-300 ease-in-out
          hover:shadow-neutral-400 hover:bg-amber-50
          focus-visible:bg-yellow-200 focus-visible:outline-0"
          ></input>
        </label>
      </div>
    );
  }
}
