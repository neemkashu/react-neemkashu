import { UseFormRegisterReturn } from 'react-hook-form';
import { v4 } from 'uuid';

type SelectProps = {
  label: string;
  register: UseFormRegisterReturn<'type'>;
};

export const AnimalTypes = {
  DOG: 'dog',
  CAT: 'cat',
  BIRD: 'bird',
  OTHER: 'other',
} as const;

const DEFAULT = '';

const PLACE_HOLDER = '-- select the type --';

export const Select = ({ label, register }: SelectProps) => {
  const uniqueId = v4();

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
        id={uniqueId}
        defaultValue={DEFAULT}
        {...register}
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
