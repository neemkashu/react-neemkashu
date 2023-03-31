import { UseFormRegister } from 'react-hook-form';
import { ReferencedInput } from './ReferencedInput';
import { PetFormData } from './formChecker';

export type RefInputProps = {
  label: string;
  register: UseFormRegister<PetFormData>;
};

export const Switcher = ({ label, register }: RefInputProps) => {
  const switchOptions = ['male', 'female'].map((option) => (
    <ReferencedInput
      label={option}
      key={option}
      value={option}
      inputType="radio"
      register={register('sex')}
    />
  ));
  return (
    <div className="flex gap-2 items-center justify-between">
      <div className=" grow">{label}</div>
      {switchOptions}
    </div>
  );
};
