import { ActionFunctionArgs, IndexRouteObject } from 'react-router-dom';
import { SEARCH_KEY } from '../../utils/constants';
import { FORM_SEARCH_KEY } from './Search';

type Action = IndexRouteObject['action'];

const setToLocalStorage = (key: string, value: FormDataEntryValue | null): void => {
  if (typeof value === 'string') {
    localStorage.setItem(key, value);
  }
};

export const findPhotos: Action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const searchQuery = formData.get(FORM_SEARCH_KEY);

  setToLocalStorage(SEARCH_KEY, searchQuery ?? '');

  return searchQuery;
};
