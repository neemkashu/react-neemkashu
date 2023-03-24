import { Component, createRef } from 'react';
import { FieldErrorMessage } from './FieldErrorMessage';
import { PetFormData } from './formChecker';

type FormField<T, U> = {
  ref: ReturnType<typeof createRef<T>>;
  errorElement: typeof FieldErrorMessage;
  getCurrentValue: () => U;
  label: string;
  component: JSX.Element;
};
type FormFieldAll<T, U> = Record<keyof PetFormData, FormField<T, U>>;

export class FormElement<T, U> extends Component<FormField<T, U>> {
  getCurrentValue: () => U;
  constructor(props: FormField<T, U>) {
    super(props);
    this.getCurrentValue = props.getCurrentValue;
  }
  render() {
    return this.props.component;
  }
}
