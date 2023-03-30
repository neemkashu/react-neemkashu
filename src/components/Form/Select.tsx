import { Component, createRef } from 'react';
import { v4 } from 'uuid';
import { elementRef } from '../../utils/types';

type SelectProps = {
  label: string;
};

export const AnimalTypes = {
  DOG: 'dog',
  CAT: 'cat',
  BIRD: 'bird',
  OTHER: 'other',
} as const;

const DEFAULT = '';

const PLACE_HOLDER = '-- select the type --';

export class Select extends Component<SelectProps> {
  selectRef: elementRef<HTMLSelectElement>;

  constructor(props: SelectProps) {
    super(props);
    this.selectRef = createRef<HTMLSelectElement>();
  }

  getAnswer = () => {
    return this.selectRef.current?.value ?? '';
  };

  render() {
    const { label } = this.props;
    const key = v4();
    return (
      <div className="flex justify-between">
        <label htmlFor={key}>{label}</label>
        <select
          ref={this.selectRef}
          id={key}
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
          {Object.values(AnimalTypes).map((animal) => {
            return (
              <option
                key={animal}
                value={animal}
              >
                {animal}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
