import { Component, createRef } from 'react';
import { ReferencedInput } from './ReferencedInput';

type RefInputProps = {
  forwardRef: ReturnType<typeof createRef<Switcher>>;
  label: string;
};
const petSex = {
  MALE: 'male',
  FEMALE: 'female',
};
const NAME = 'radio-name';
type radioRef = ReturnType<typeof createRef<HTMLInputElement>>;

export class Switcher extends Component<RefInputProps> {
  switcherRef: RefInputProps['forwardRef'];
  switchOptions: {
    first: { ref: radioRef; element: JSX.Element };
    second: { ref: radioRef; element: JSX.Element };
  };

  constructor(props: RefInputProps) {
    super(props);
    this.switcherRef = props.forwardRef;
    console.log(' this.switcherRef', this.switcherRef);

    const firstRef = createRef<HTMLInputElement>();
    const secondRef = createRef<HTMLInputElement>();

    this.switchOptions = {
      first: {
        ref: firstRef,
        element: (
          <ReferencedInput
            label={petSex.FEMALE}
            name={NAME}
            inputType="radio"
            forwardRef={firstRef}
          />
        ),
      },
      second: {
        ref: secondRef,
        element: (
          <ReferencedInput
            label={petSex.MALE}
            name={NAME}
            inputType="radio"
            forwardRef={secondRef}
          />
        ),
      },
    };
  }
  getTheChecked = () => {
    console.log('this.switchOptions.first.ref.current', this.switchOptions.first.ref.current);
    return this.switchOptions.first.ref.current?.checked ? petSex.FEMALE : petSex.MALE;
  };
  render() {
    const { label } = this.props;

    return (
      <div className="flex gap-2 items-center">
        <>
          {label}
          {this.switchOptions.first.element}
          {this.switchOptions.second.element}
        </>
        <button
          onClick={() => {
            console.log(this.switcherRef.current);
          }}
        >
          Show the ref
        </button>
      </div>
    );
  }
}
