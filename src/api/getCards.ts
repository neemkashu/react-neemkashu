import { PhotoDetailed, PhotoDetailedRaw } from './types';

export const PROXY_URL = 'https://sore-plum-skunk-wig.cyclic.app/';

const getMinDate = (): string => {
  const year = new Date();
  year.setFullYear(2020);
  return year.getTime().toString();
};
export const getRequestParams = (text?: string): string => {
  const params = new URLSearchParams();
  params.set('method', 'flickr.photos.search');
  params.append('format', 'json');
  params.append('per_page', '10');
  params.append('has_geo', 'true');
  params.append('max_upload_date', getMinDate());
  params.append('extras', ['owner_name'].join(','));
  params.append('sort', 'date-posted-desc');
  params.append('content_type', '1');
  params.append('content_types', '0');
  params.append('nojsoncallback', '1');

  if (text) params.append('text', text);
  return params.toString();
};
export const getPhotoRequest = (id: string): string => {
  const url = new URL(PROXY_URL);
  const params = new URLSearchParams();

  params.set('method', 'flickr.photos.getInfo');
  params.append('format', 'json');
  params.append('photo_id', id);
  params.append('nojsoncallback', '1');

  url.search = params.toString();
  return url.toString();
};

export const getCard = async (id: string): Promise<PhotoDetailed | null> => {
  const response = await fetch(getPhotoRequest(id));
  if (!response.ok) {
    throw new Error('Sorry, Flickr error when loading photo!');
  }
  const data: PhotoDetailedRaw = await response.json();

  if (data.code) {
    throw new Error(data.message);
  }

  return data.photo;
};
