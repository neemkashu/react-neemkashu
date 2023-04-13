import { FC } from 'react';
import { createPortal } from 'react-dom';
import { Photo } from '../../api/getCards';
import { useCardModal } from './hooks';
import { ModalCard } from '../Modal/ModalCard';
import { ListItem } from '../Modal/ListItem';
import { useSelector } from 'react-redux';
import { selectSearchText } from '../../store';
import { useGetPhotosByQuery } from '../../api/flickrApi';

type PhotoCard = Omit<Photo, 'description'>;

const getImageURL = ({ id, secret, server, farm }: PhotoCard): string => {
  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
};

export const PhotoCardSmall: FC<PhotoCard> = (card) => {
  const { ownername, title, id } = card;
  const searchText = useSelector(selectSearchText);
  const { isFetching } = useGetPhotosByQuery(searchText);
  const fading = isFetching ? 'opacity-20' : 'opacity-100';
  const source = getImageURL(card);

  const { button, photoDetails, isModalVisible, modalHandler } = useCardModal({ id });

  return (
    <div className="p-2 border-2 rounded-lg bg-white border-zinc-300 shadow-md shadow-zinc-400 max-h-min">
      <div className={`flex flex-col flex-wrap justify-evenly gap-2  ${fading}`}>
        <div
          className="self-center w-full h-64 bg-no-repeat bg-contain bg-center"
          style={{ backgroundImage: `url(${source})` }}
        />
        <div className="flex flex-col gap-1">
          {button}
          <ul>
            <ListItem caption="Owner">{ownername}</ListItem>
            <ListItem caption="Title">{title}</ListItem>
          </ul>
        </div>
      </div>
      {isModalVisible &&
        photoDetails &&
        createPortal(
          <ModalCard
            details={photoDetails}
            source={source}
            onClose={modalHandler}
          />,
          document.body
        )}
    </div>
  );
};
