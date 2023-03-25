import { Component, createRef } from 'react';
import { ReferencedInput } from './ReferencedInput';

export type RefInputProps = {
  label: string;
};
const petSex = {
  MALE: 'male',
  FEMALE: 'female',
} as const;
type optionKey = keyof typeof petSex;

const HTML_INPUT_NAME = 'radio-name';

type radioRef = ReturnType<typeof createRef<ReferencedInput<string>>>;
type switchOptionsType = Record<optionKey, { ref: radioRef; element: JSX.Element }>;

export class Switcher extends Component<RefInputProps> {
  switchOptions: switchOptionsType;
  maleRef: radioRef;
  femaleRef: radioRef;

  constructor(props: RefInputProps) {
    super(props);

    this.maleRef = createRef<ReferencedInput<string>>();
    this.femaleRef = createRef<ReferencedInput<string>>();

    this.switchOptions = Object.keys(petSex).reduce<switchOptionsType>((accum, option) => {
      const key = option as keyof typeof petSex;
      accum[key] = {
        ref: key === 'MALE' ? this.maleRef : this.femaleRef,
        element: (
          <ReferencedInput
            label={petSex[key]}
            key={key}
            name={HTML_INPUT_NAME}
            inputType="radio"
            ref={key === 'MALE' ? this.maleRef : this.femaleRef}
          />
        ),
      };
      return accum;
    }, {} as switchOptionsType);
  }

  getAnswer = () => {
    if (this.maleRef.current?.getIsChecked()) return petSex.MALE;
    if (this.femaleRef.current?.getIsChecked()) return petSex.FEMALE;
    return '';
  };
  render() {
    const { label } = this.props;

    return (
      <div className="flex gap-2 items-center justify-between">
        <div className=" grow">{label}</div>
        {Object.values(this.switchOptions).map((option) => {
          return option.element;
        })}
      </div>
    );
  }
}