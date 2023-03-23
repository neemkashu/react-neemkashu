import { Component } from 'react';
import { elementRef } from 'src/utils/types';

type SelectProps = {
  forwardRef: elementRef<HTMLSelectElement>;
  label: string;
};

const AnimalTypes = {
  DOG: 'dog',
  CAT: 'cat',
  BIRD: 'bird',
  OTHER: 'other',
} as const;

const DEFAULT = 'defaultSelection';

export class Select extends Component<SelectProps> {
  render() {
    const { forwardRef, label } = this.props;
    return (
      <label>
        {label}
        <select
          ref={forwardRef}
          defaultValue={DEFAULT}
          className=" m-0 rounded border-2 border-solid border-yellow-900
         max-w-xs h-6 px-1 bg-white bg-no-repeat text-base
         duration-300 ease-in-out
        hover:shadow-neutral-400 hover:bg-amber-50
        focus-visible:bg-yellow-200 focus-visible:outline-0"
        >
          <option
            disabled
            value={DEFAULT}
            className="bg-slate-100"
          >
            {'-- select the type --'}
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
      </label>
    );
  }
}
