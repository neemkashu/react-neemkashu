import { useAsyncValue } from 'react-router-dom';
import { FlickrData } from '../../api/getCards';
import { PhotoCardSmall } from '../Cards/PhotoCardSmall';

export const PhotoCards = (): JSX.Element => {
  const dataRaw = useAsyncValue() as FlickrData | null;
  console.log('==== CARDS DATA', dataRaw);
  if (!dataRaw) return <p>No photos!</p>;

  const cards = dataRaw.photos.photo;

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
