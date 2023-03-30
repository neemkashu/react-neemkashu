import { HTMLInputTypeAttribute, RefObject, useImperativeHandle, useRef } from 'react';
import { v4 } from 'uuid';
import styles from '../../styles/ReferencedInput.module.css';

export interface InputWithGetter<T> {
  getUserAnswer: () => T;
}
export type AnswerRef<T> = RefObject<InputWithGetter<T>>;

type RefInputProps<T> = {
  label: string;
  inputType: HTMLInputTypeAttribute;
  answerRef: AnswerRef<T>;
  name?: string;
  accept?: string;
};

export const ReferencedInput = <T extends string | FileList | null | boolean>(
  props: RefInputProps<T>
) => {
  const { label, inputType, answerRef, name, accept } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(
    answerRef,
    () => {
      return {
        getUserAnswer() {
          switch (inputType) {
            case 'file': {
              return (inputRef.current?.files ?? null) as T;
            }
            case 'checkbox' || 'radio': {
              return (inputRef.current?.checked ?? false) as T;
            }

            default:
              return (inputRef.current?.value ?? '') as T;
          }
        },
      };
    },
    [inputType]
  );

  const inputStyle = inputType === 'radio' ? styles.radio : styles.nonradio;
  const fileStyle = inputType === 'file' ? 'flex-col' : 'flex-row';
  const key = v4();

  return (
    <div className={`flex ${fileStyle}  ${inputStyle}`}>
      <label
        className={inputType === 'radio' ? 'hover:cursor-pointer' : ''}
        htmlFor={key}
      >
        {label}
      </label>
      <input
        ref={inputRef}
        type={inputType}
        name={name}
        id={key}
        accept={accept}
        className=" m-0 rounded border-2 border-solid border-yellow-900
          max-w- px-1 bg-white bg-no-repeat text-base
           duration-300 ease-in-out
          hover:shadow-neutral-400 hover:bg-amber-200
          focus-visible:bg-yellow-200 focus-visible:outline-0"
      />
    </div>
  );
};
