import { FC, useState } from 'react';
import { v4 } from 'uuid';
import { CardGrid } from '../layouts/CardGrid';
import { PetFormData } from './Form/formChecker';
import { PetForm } from './Form/PetForm';
import { PopMessage } from './Form/PopMessage';
import { PetCard } from './Cards/PetCard';

type CardData = PetFormData & { id: string; imgSrc: string };
const makeCard = (data: PetFormData): CardData => {
  const nextCard: CardData = {
    ...data,
    imgSrc: (data.img && URL.createObjectURL(data.img[0])) ?? '',
    id: v4(),
  };
  return nextCard;
};

export const Creator: FC<Record<string, never>> = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [isPopShown, setIsPopShown] = useState(false);

  const getCardInfo = (data: PetFormData): void => {
    setCards([makeCard(data), ...cards]);
    setIsPopShown(true);
  };
  const hidePopup = (): void => setIsPopShown(false);

  return (
    <div className="grid grid-col-1 md:grid-cols-form w-auto justify-center gap-2 p-2">
      <div className=" relative">
        <PetForm backData={getCardInfo} />
        {isPopShown ? <PopMessage hide={hidePopup} /> : null}
      </div>
      <CardGrid>
        {cards.map((data) => {
          const { name, birth, type, sex, isExperienced, imgSrc, id } = data;
          return (
            <PetCard
              name={name}
              birth={birth}
              type={type}
              sex={sex ?? ''}
              isExperienced={isExperienced}
              img={imgSrc}
              key={id}
            />
          );
        })}
      </CardGrid>
    </div>
  );
};
