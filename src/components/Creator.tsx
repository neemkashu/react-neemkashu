import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { CardGrid } from '../layouts/CardGrid';
import { PetFormData } from './Form/formChecker';
import { PetForm } from './Form/PetForm';
import { PopMessage } from './Form/PopMessage';
import { PetCard } from './Cards/PetCard';
import { addFormCard } from './Form/formSlice';
import { selectFormCards } from '../store';
import { SerializableCardData } from './Form/types';

export const makeCard = (data: PetFormData): SerializableCardData => {
  const newCard: SerializableCardData = {
    ...data,
    imgSrc: (data.img && URL.createObjectURL(data.img[0])) ?? '',
    id: v4(),
  };
  delete newCard.img;
  return newCard;
};
export const Creator: FC<Record<string, never>> = () => {
  const cards = useSelector(selectFormCards);
  const dispatch = useDispatch();
  const [isPopShown, setIsPopShown] = useState(false);

  const getCardInfo = (data: PetFormData): void => {
    const newCard = makeCard(data);
    dispatch(addFormCard(newCard));
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
