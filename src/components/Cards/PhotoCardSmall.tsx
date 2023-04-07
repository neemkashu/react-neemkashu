import { FC } from 'react';
import { useNavigation } from 'react-router-dom';
import { Photo } from '../../api/getCards';

type PhotoCard = Omit<Photo, 'description'>;

const getImageURL = ({ id, secret, server, farm }: PhotoCard): string => {
  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
};

const PhotoCardCaptions = {
  OWNER: 'Owner',
  TITLE: 'Title',
} as const;

export const PhotoCardSmall: FC<PhotoCard> = (card) => {
  const navigation = useNavigation();
  const isLoading = navigation.state;
  const fading = isLoading !== 'idle' ? 'opacity-20' : 'opacity-100';

  const { ownername, title } = card;

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
              <strong>{PhotoCardCaptions.OWNER}:</strong> {ownername}
            </li>
            <li>
              <strong>{title ? `${PhotoCardCaptions.TITLE}:` : 'No title provided'}</strong>{' '}
              {title ?? ''}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
