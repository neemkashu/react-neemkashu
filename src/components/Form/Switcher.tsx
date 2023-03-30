import { useImperativeHandle, useRef } from 'react';
import { AnswerRef, InputWithGetter, ReferencedInput } from './ReferencedInput';

export type RefInputProps = {
  label: string;
  answerRef: AnswerRef<string>;
};

const HTML_INPUT_NAME = 'radio-name';

export const Switcher = ({ label, answerRef }: RefInputProps) => {
  const maleRef = useRef<InputWithGetter<boolean>>(null);
  const femaleRef = useRef<InputWithGetter<boolean>>(null);

  useImperativeHandle(
    answerRef,
    () => {
      return {
        getUserAnswer() {
          const valueMale = maleRef.current?.getUserAnswer() ? 'male' : '';
          const valueFemale = femaleRef.current?.getUserAnswer() ? 'female' : '';
          return (valueMale || valueFemale) ?? '';
        },
      };
    },
    []
  );

  const switchOptions = ['male', 'female'].map((option) => (
    <ReferencedInput
      label={option}
      key={option}
      name={HTML_INPUT_NAME}
      inputType="radio"
      answerRef={option === 'male' ? maleRef : femaleRef}
    />
  ));
  return (
    <div className="flex gap-2 items-center justify-between">
      <div className=" grow">{label}</div>
      {switchOptions}
    </div>
  );
};
