import { FC } from 'react';
import { ListItem } from '../Modal/ListItem';

export const PetCardTextContent = {
  PET_BIRTH: 'Birth',
  PET_SHOW: 'Agrement recived',
} as const;

interface PetInfo {
  name: string;
  birth: string;
  type: string;
  sex: string;
  isExperienced: boolean;
  img: string;
}

export const PetCard: FC<PetInfo> = ({ name, birth, type, sex, isExperienced, img }) => {
  return (
    <div className="p-2 border-2 rounded-lg bg-white border-zinc-300 shadow-md shadow-zinc-400 max-h-min">
      <div className="flex flex-col flex-wrap justify-evenly gap-2 tiny:flex-row sm:flex-col lg:flex-row">
        <img
          className=" 100 self-center max-w-64 max-h-64"
          src={img}
          alt=""
        />
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl">{name}</h2>
          <h3>
            {type} - {sex}
          </h3>
          <ul>
            <ListItem caption={PetCardTextContent.PET_BIRTH}>{birth}</ListItem>
            <ListItem caption="Agrement recived">{isExperienced ? 'yes' : 'no'}</ListItem>
          </ul>
        </div>
      </div>
    </div>
  );
};
