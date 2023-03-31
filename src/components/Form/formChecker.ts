import { mapOverObject } from '../../utils/helpers';

export type PetFormData = {
  name: string;
  birth: string;
  type: string;
  sex: string | null;
  isExperienced: boolean;
  img: FileList | null;
};

export type FieldMessages = Record<keyof PetFormData, string>;
export type FieldVerdicts = Record<keyof PetFormData, boolean>;

export const ErrorMessages: FieldMessages = {
  name: 'Enter a name with the first uppercase letter.',
  birth: 'Choose a date of birth that is earlier than today.',
  type: 'Choose the type of pet.',
  sex: 'Choose male or female.',
  isExperienced: 'Confirm that you have read the rules of the show',
  img: 'Choose a file with a picture',
} as const;

const vilidateBirth = (birth: string): boolean => {
  if (!birth) return !!birth;
  const date = new Date(birth);
  const today = new Date();
  return date.getTime() < today.getTime();
};

const getValidationVerdicts = (formData: PetFormData): FieldVerdicts => {
  const { name, birth, type, sex, img, isExperienced } = formData;

  const validations = {
    name: name !== '' && name[0].toLowerCase() !== name[0],
    birth: vilidateBirth(birth),
    type: !!type,
    sex: !!sex,
    isExperienced,
    img: !!img?.length,
  };

  return validations;
};

export const checkFormIsValid = (formData: PetFormData): boolean => {
  const validations = getValidationVerdicts(formData);

  return Object.values(validations).every((validValue) => validValue);
};

export const getErrorMessages = (formData: PetFormData): FieldMessages => {
  const validations = getValidationVerdicts(formData);

  const messages = mapOverObject(ErrorMessages, (accum, keyErr) => {
    accum[keyErr] = validations[keyErr] ? '' : ErrorMessages[keyErr];
    return accum;
  });

  return messages;
};
