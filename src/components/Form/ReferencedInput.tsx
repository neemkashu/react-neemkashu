import { UseFormRegisterReturn } from 'react-hook-form';
import { HTMLInputTypeAttribute } from 'react';
import { v4 } from 'uuid';
import styles from '../../styles/ReferencedInput.module.css';

type RefInputProps = {
  label: string;
  inputType: HTMLInputTypeAttribute;
  register: UseFormRegisterReturn<string>;
  accept?: string;
  value?: string;
};

export const ReferencedInput = (props: RefInputProps) => {
  const { label, inputType, register, accept, value } = props;

  const inputStyle = inputType === 'radio' ? styles.radio : styles.nonradio;
  const fileStyle = inputType === 'file' ? 'flex-col' : 'flex-row';
  const uniqueId = v4();

  return (
    <div className={`flex ${fileStyle}  ${inputStyle}`}>
      <label
        className={inputType === 'radio' ? 'hover:cursor-pointer' : ''}
        htmlFor={uniqueId}
      >
        {label}
      </label>
      <input
        type={inputType}
        id={uniqueId}
        {...register}
        accept={accept}
        value={value}
        className=" m-0 rounded border-2 border-solid border-yellow-900
          max-w- px-1 bg-white bg-no-repeat text-base
           duration-300 ease-in-out
          hover:shadow-neutral-400 hover:bg-amber-200
          focus-visible:bg-yellow-200 focus-visible:outline-0"
      />
    </div>
  );
};
