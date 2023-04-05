import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { ReferencedInput } from './ReferencedInput';

export type RefInputProps = {
  label: string;
  register: UseFormRegisterReturn<'sex'>;
};

export const Switcher: FC<RefInputProps> = ({ label, register }) => {
  const switchOptions = ['male', 'female'].map((option) => (
    <ReferencedInput
      label={option}
      key={option}
      value={option}
      inputType="radio"
      register={register}
    />
  ));
  return (
    <div className="flex gap-2 items-center justify-between">
      <div className=" grow">{label}</div>
      {switchOptions}
    </div>
  );
};
