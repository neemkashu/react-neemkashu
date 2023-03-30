import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { CardGrid } from '../layouts/CardGrid';
import { PetFormData } from './Form/formChecker';
import { PetForm } from './Form/PetForm';
import { PopMessage } from './Form/PopMessage';
import { PetCard } from './PetCard';

type CardData = PetFormData & { id: string; imgSrc: string };

const NOTIFICATION_DURATION = 2000;

const makeCard = (data: PetFormData): CardData => {
  const nextCard: CardData = {
    ...data,
    imgSrc: (data.img && URL.createObjectURL(data.img[0])) ?? '',
    id: v4(),
  };
  return nextCard;
};

export const Creator = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [isPopShown, setIsPopShown] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      clearTimeout(timer);
      cards.map(({ imgSrc }) => imgSrc).forEach((imageUrl) => URL.revokeObjectURL(imageUrl ?? ''));
    };
  }, []);

  const showPopUp = () => {
    setIsPopShown(true);

    const timerId = setTimeout(() => {
      setIsPopShown(false);
    }, NOTIFICATION_DURATION);

    setTimer(timerId);
  };

  useEffect(() => {
    showPopUp();
  }, [cards]);

  const getCardInfo = (data: PetFormData) => {
    setCards([makeCard(data), ...cards]);
  };

  return (
    <div className="grid grid-col-1 md:grid-cols-form w-auto justify-center gap-2 p-2">
      <div className=" relative">
        <PetForm backData={getCardInfo} />
        {isPopShown ? <PopMessage /> : null}
      </div>
      <CardGrid>
        {cards.map((data) => {
          const { name, birth, type, sex, isExperienced, imgSrc, id } = data;
          return (
            <PetCard
              name={name}
              birth={birth}
              type={type}
              sex={sex}
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
