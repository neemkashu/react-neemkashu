import { FC } from 'react';
import { Photo } from '../../api/getCards';
import { useCard } from './hooks';

type PhotoCard = Omit<Photo, 'description'>;

const getImageURL = ({ id, secret, server, farm }: PhotoCard): string => {
  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
};

export const PhotoCardSmall: FC<PhotoCard> = (card) => {
  const { ownername, title } = card;
  const { fading, Title } = useCard(title);

  return (
    <div className="p-2 border-2 rounded-lg bg-white border-zinc-300 shadow-md shadow-zinc-400 max-h-min">
      <div className="flex flex-col flex-wrap justify-evenly gap-2 tiny:flex-row sm:flex-col lg:flex-row">
        <img
          className={`self-center max-w-64 h-64 ${fading}`}
          src={getImageURL(card)}
          alt=""
        />
        <div className="flex flex-col gap-1">
          <ul>
            <li>
              <strong>Owner:</strong> {ownername}
            </li>
            {Title}
          </ul>
        </div>
      </div>
    </div>
  );
};
