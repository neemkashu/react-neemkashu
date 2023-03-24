import { Component, createRef, HTMLInputTypeAttribute } from 'react';
import { elementRef } from 'src/utils/types';
import { v4 } from 'uuid';
import styles from '../styles/Input.module.css';

type RefInputProps = {
  label: string;
  inputType: HTMLInputTypeAttribute;
  name?: string;
  innerText?: string;
  accept?: string;
};

export class ReferencedInput<T> extends Component<RefInputProps> {
  inputRef: elementRef<HTMLInputElement>;

  constructor(props: RefInputProps) {
    super(props);
    this.inputRef = createRef<HTMLInputElement>();
  }
  getAnswer = (): T => {
    const { inputType } = this.props;
    if (inputType === 'file') return (this.inputRef.current?.files ?? null) as T;
    if (inputType === 'checkbox') return (this.inputRef.current?.checked ?? false) as T;
    return (this.inputRef.current?.value ?? '') as T;
  };
  getIsChecked = (): boolean => {
    return this.inputRef.current?.checked ?? false;
  };
  render() {
    const { label, inputType, name, innerText, accept } = this.props;
    const inputStyle = inputType === 'radio' ? styles.radio : styles.nonradio;
    const fileStyle = inputType === 'file' ? 'flex-col' : 'flex-row';
    const key = v4();
    return (
      <div className={`flex ${fileStyle}  ${inputStyle}`}>
        <label htmlFor={key}>{label}</label>
        <input
          ref={this.inputRef}
          type={inputType}
          name={name}
          id={key}
          accept={accept}
          className=" m-0 rounded border-2 border-solid border-yellow-900
          max-w- px-1 bg-white bg-no-repeat text-base
           duration-300 ease-in-out
          hover:shadow-neutral-400 hover:bg-amber-50
          focus-visible:bg-yellow-200 focus-visible:outline-0"
        >
          {innerText}
        </input>
      </div>
    );
  }
}
