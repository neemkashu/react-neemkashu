import { imageRegExp } from '../../utils/constants';

export type PetFormData = {
  name: string;
  birth: string;
  type: string;
  sex: string | null;
  isExperienced: boolean;
  img: FileList | null;
};

export type FieldMessages = Record<keyof PetFormData, string>;

export const ErrorMessages: FieldMessages = {
  name: 'Enter a name with the first uppercase letter.',
  birth: 'Choose a date of birth that is earlier than today.',
  type: 'Choose the type of pet.',
  sex: 'Choose male or female.',
  isExperienced: 'Confirm that you have read the rules of the show',
  img: 'Choose a file with a picture',
} as const;

export const vilidateBirth = (birth: string): boolean => {
  if (!birth) return !!birth;
  const date = new Date(birth);
  const today = new Date();
  return date.getTime() < today.getTime();
};
export const vilidateImage = (img: FileList | null): boolean => {
  const isEmptyList = !img?.length;
  if (!isEmptyList) {
    const isPicture = imageRegExp.test(img[0].name);
    return isPicture;
  }
  return false;
};
export const validateName = (name: string): boolean => {
  return name !== '' && name[0].toLowerCase() !== name[0];
};
