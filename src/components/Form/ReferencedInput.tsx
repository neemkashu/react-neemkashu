import { Component, HTMLInputTypeAttribute } from 'react';
import { elementRef } from 'src/utils/types';

type RefInputProps = {
  forwardRef: elementRef<HTMLInputElement>;
  label: string;
  inputType: HTMLInputTypeAttribute;
  name?: string;
  innerText?: string;
};

export class ReferencedInput extends Component<RefInputProps> {
  render() {
    const { forwardRef, label, inputType, name, innerText } = this.props;
    return (
      <div>
        <label>
          {label}
          <input
            ref={forwardRef}
            type={inputType}
            name={name}
            className=" m-0 rounded border-2 border-solid border-yellow-900
          max-w-xs h-6 px-1 bg-white bg-no-repeat text-base
           duration-300 ease-in-out
          hover:shadow-neutral-400 hover:bg-amber-50
          focus-visible:bg-yellow-200 focus-visible:outline-0"
          >
            {innerText}
          </input>
        </label>
      </div>
    );
  }
}
