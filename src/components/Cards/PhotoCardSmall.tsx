import { FC, MouseEventHandler, useState } from 'react';
import { createPortal } from 'react-dom';
import { useFetcher } from 'react-router-dom';
import { Photo, PhotoDetailed, getCard } from '../../api/getCards';
import { useDetails, useFading } from './hooks';
import { ModalCard } from '../Modal/ModalCard';
import { ListItem } from '../Modal/ListItem';
import { ButtonSubmit } from '../../Buttons/Buttons';

type PhotoCard = Omit<Photo, 'description'>;

const getImageURL = ({ id, secret, server, farm }: PhotoCard): string => {
  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
};

export const PhotoCardSmall: FC<PhotoCard> = (card) => {
  const { ownername, title, id } = card;
  const { fading } = useFading();
  const [showModal, setShowModal] = useState(false);
  const [photoDetails, setPhotoDetails] = useState<PhotoDetailed | null>(null);
  const source = getImageURL(card);
  const details = useDetails();

  const fetcher = useFetcher();

  const handleDetails: MouseEventHandler = async () => {
    setShowModal(true);
    if (!photoDetails) {
      const photoData = await getCard(id);
      setPhotoDetails(photoData);
    }
  };

  return (
    <div className="p-2 border-2 rounded-lg bg-white border-zinc-300 shadow-md shadow-zinc-400 max-h-min">
      <div className="flex flex-col flex-wrap justify-evenly gap-2">
        <div
          className={`self-center w-full h-64 bg-no-repeat bg-contain bg-center ${fading}`}
          style={{ backgroundImage: `url(${source})` }}
        />
        <div className="flex flex-col gap-1">
          <ButtonSubmit
            name="photo"
            value={id}
            handler={handleDetails}
          >
            {details}
          </ButtonSubmit>
          <ul>
            <ListItem caption="Owner">{ownername}</ListItem>
            <ListItem caption="Title">{title}</ListItem>
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
