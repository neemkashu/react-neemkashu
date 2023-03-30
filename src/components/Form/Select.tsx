import { useImperativeHandle, useRef } from 'react';
import { v4 } from 'uuid';
import { AnswerRef } from './ReferencedInput';

type SelectProps = {
  label: string;
  answerRef: AnswerRef<string>;
};

export const AnimalTypes = {
  DOG: 'dog',
  CAT: 'cat',
  BIRD: 'bird',
  OTHER: 'other',
} as const;

const DEFAULT = '';

const PLACE_HOLDER = '-- select the type --';

export const Select = ({ label, answerRef }: SelectProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const uniqueId = v4();

  useImperativeHandle(
    answerRef,
    () => {
      return {
        getUserAnswer() {
          return selectRef.current?.value ?? '';
        },
      };
    },
    []
  );

  const options = Object.values(AnimalTypes).map((animal) => {
    return (
      <option
        key={animal}
        value={animal}
      >
        {animal}
      </option>
    );
  });

  return (
    <div className="flex justify-between">
      <label htmlFor={uniqueId}>{label}</label>
      <select
        ref={selectRef}
        id={uniqueId}
        defaultValue={DEFAULT}
        className=" m-0 rounded border-2 border-solid border-yellow-900
         max-w-xs px-1 bg-white bg-no-repeat text-base
         duration-300 ease-in-out
        hover:shadow-neutral-400 hover:bg-amber-200
        focus-visible:bg-yellow-200 focus-visible:outline-0"
      >
        <option
          disabled
          value={DEFAULT}
          className="bg-slate-100"
        >
          {PLACE_HOLDER}
        </option>
        {options}
      </select>
    </div>
  );
};
