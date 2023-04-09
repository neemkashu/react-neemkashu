import { LoaderFunction, defer } from 'react-router-dom';
import { getCards } from '../api/getCards';
import { SEARCH_KEY } from '../utils/constants';

export const photoLoader: LoaderFunction = async () => {
  const searchQuery = localStorage.getItem(SEARCH_KEY);
  const cardsRow = getCards(searchQuery ?? '');

  return defer({
    cards: cardsRow,
  });
};
