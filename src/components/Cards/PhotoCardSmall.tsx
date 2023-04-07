import { FC, MouseEventHandler, useState } from 'react';
import { createPortal } from 'react-dom';
import { Photo, PhotoDetailed, getCard } from '../../api/getCards';
import { useCard } from './hooks';
import { ModalCard } from '../ModalCard';

type PhotoCard = Omit<Photo, 'description'>;

const getImageURL = ({ id, secret, server, farm }: PhotoCard): string => {
  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
};

export const PhotoCardSmall: FC<PhotoCard> = (card) => {
  const { ownername, title, id } = card;
  const { fading, Title } = useCard(title);
  const [showModal, setShowModal] = useState(false);
  const [photoDetails, setPhotoDetails] = useState<PhotoDetailed | null>(null);
  const source = getImageURL(card);

  const handleDetails: MouseEventHandler = async () => {
    setShowModal(true);
    if (!photoDetails) {
      const photoData = await getCard(id);
      setPhotoDetails(photoData);
      console.log('fetch details', photoData);
    }
  };

  return (
    <div className="p-2 border-2 rounded-lg bg-white border-zinc-300 shadow-md shadow-zinc-400 max-h-min">
      <div className="flex flex-col flex-wrap justify-evenly gap-2 tiny:flex-row sm:flex-col lg:flex-row">
        <img
          className={`self-center max-w-64 h-64 ${fading}`}
          src={source}
          alt=""
        />
        <div className="flex flex-col gap-1">
          <button
            onClick={handleDetails}
            type="button"
            className="self-center
          bg-zinc-500 hover:bg-zinc-400 text-white font-bold
          p-1 border-b-4 border-zinc-700 hover:border-zinc-500 rounded
          duration-300 ease-in-out"
          >
            Details
          </button>
          <ul>
            <li>
              <strong>Owner:</strong> {ownername}
            </li>
            {Title}
          </ul>
        </div>
      </div>
      {showModal &&
        photoDetails &&
        createPortal(
          <ModalCard
            details={photoDetails}
            source={source}
            onClose={(): void => setShowModal(false)}
          />,
          document.body
        )}
    </div>
  );
};
