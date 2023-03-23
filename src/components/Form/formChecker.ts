import { PetFormData } from '../../utils/types';

export type FieldMessages = Record<keyof PetFormData, string>;
export type FieldVerdicts = Record<keyof PetFormData, boolean>;

export const ErrorMessages: FieldMessages = {
  name: 'enter a name with first uppercase letter',
  birth: 'choose date of birth',
  type: 'choose type of the pet',
  sex: 'choose male or female',
  isExperienced: '',
  img: 'choose file with a picture',
} as const;

const getValidationVerdicts = (formData: PetFormData): FieldVerdicts => {
  const { name, birth, type, sex, img } = formData;
  const validations = {
    name: name !== '' && name[0].toLowerCase() !== name[0],
    birth: birth !== '',
    type: type !== '',
    sex: sex !== '',
    isExperienced: true,
    img: img !== null,
  };
  return validations;
};

export const checkFormIsValid = (formData: PetFormData): boolean => {
  const validations = getValidationVerdicts(formData);
  return Object.values(validations).every((validValue) => validValue);
};

export const getErrorMessages = (formData: PetFormData): FieldMessages => {
  const validations = getValidationVerdicts(formData);

  const messages = Object.keys(ErrorMessages).reduce<FieldMessages>((accum, key) => {
    const keyErr = key as keyof FieldMessages;
    accum[keyErr] = validations[keyErr] ? ErrorMessages[keyErr] : '';
    return accum;
  }, {} as FieldMessages);

  return messages;
};
