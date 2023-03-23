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

const NAME = 'radio-name';
const DEFAULT_VALUE = 'not-chosen';

type radioRef = ReturnType<typeof createRef<HTMLInputElement>>;
type switchOptionsType = Record<optionKey, { ref: radioRef; element: JSX.Element }>;

export class Switcher extends Component<RefInputProps> {
  switchOptions: switchOptionsType;
  maleRef: radioRef;
  femaleRef: radioRef;

  constructor(props: RefInputProps) {
    super(props);

    this.maleRef = createRef<HTMLInputElement>();
    this.femaleRef = createRef<HTMLInputElement>();

    this.switchOptions = Object.keys(petSex).reduce<switchOptionsType>((accum, option) => {
      const key = option as keyof typeof petSex;
      accum[key] = {
        ref: key === 'MALE' ? this.maleRef : this.femaleRef,
        element: (
          <ReferencedInput
            label={petSex[key]}
            key={key}
            name={NAME}
            inputType="radio"
            forwardRef={key === 'MALE' ? this.maleRef : this.femaleRef}
          />
        ),
      };
      return accum;
    }, {} as switchOptionsType);
  }

  getTheChecked = () => {
    if (this.maleRef.current?.checked) return petSex.MALE;
    if (this.femaleRef.current?.checked) return petSex.FEMALE;
    return DEFAULT_VALUE;
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
