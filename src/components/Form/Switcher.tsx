import { useRef } from 'react';
import { InputWithGetter, ReferencedInput } from './ReferencedInput';

export type RefInputProps = {
  label: string;
};

const HTML_INPUT_NAME = 'radio-name';

export const Switcher = ({ label }: RefInputProps) => {
  const maleRef = useRef<InputWithGetter<string>>(null);
  const femaleRef = useRef<InputWithGetter<string>>(null);

  const switchOptions = ['male', 'female'].map((option) => {
    return (
      <ReferencedInput
        label={option}
        key={option}
        name={HTML_INPUT_NAME}
        inputType="radio"
        answerRef={option === 'male' ? maleRef : femaleRef}
      />
    );
  });
  return (
    <div className="flex gap-2 items-center justify-between">
      <div className=" grow">{label}</div>
      {switchOptions}
    </div>
  );
};
