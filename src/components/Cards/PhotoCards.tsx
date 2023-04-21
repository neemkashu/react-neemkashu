import { useSelector } from 'react-redux';
import { PhotoCardSmall } from './PhotoCardSmall';
import { useGetPhotosByQuery } from '../../api/flickrApi';
import { selectSearchText } from '../../redux/store';

export const PhotoCards = (): JSX.Element => {
  const searchText = useSelector(selectSearchText);
  const { data } = useGetPhotosByQuery(searchText);

  if (!data) return <p>No photos!</p>;

  const cards = data.photos.photo;

  if (!cards.length) return <p>Sorry, no results for your request!</p>;

  return (
    <>
      {cards.map((card) => (
        <PhotoCardSmall
          key={card.id}
          {...card}
        />
      ))}
    </>
  );
};
