import { PetFormData } from './formChecker';

type Img = Pick<PetFormData, 'img'>;

export type SerializableCardData = Omit<PetFormData, 'img'> &
  Partial<Img> & { id: string; imgSrc: string };
