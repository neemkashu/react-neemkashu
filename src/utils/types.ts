import { createRef } from 'react';

export type elementRef<T extends Element> = ReturnType<typeof createRef<T>>;

export type PetFormData = {
  name: string;
  birth: string;
  type: string;
  sex: string;
  isExperienced: boolean;
  img: FileList | null;
};
