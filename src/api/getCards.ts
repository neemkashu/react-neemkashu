const API_KEY = import.meta.env.VITE_API_KEY;

interface Photo {
  id: string;
  date_taken: string;
  farm: number;
  title: string;
  views: string;
  description: {
    ['_content']: string;
  };
  ownername: string;
  tags: string;
}
export interface FlickrData {
  photos: {
    page: number;
    pages: number;
    perpage: number;
    total: number;
    photo: Photo[];
  };
  stat: string;
  code?: string;
  mesaage?: string;
}
const getMinDate = (): string => {
  const year = new Date();
  year.setFullYear(2020);
  return year.getTime().toString();
};

const getRequestUrl = (): string => {
  const url = new URL('https://api.flickr.com/services/rest/');
  const params = new URLSearchParams();
  params.set('method', 'flickr.photos.search');
  params.append('api_key', API_KEY);
  params.append('format', 'json');
  params.append('per_page', '10');
  params.append('text', 'dog');
  params.append('has_geo', 'true');
  params.append('min_taken_date', getMinDate());
  params.append('extras', ['description', 'owner_name', 'date_taken', 'tags', 'views'].join(','));
  params.append('sort', 'date-posted-desc');
  params.append('nojsoncallback', '1');
  params.append('content_type', '0');

  url.search = params.toString();
  return url.toString();
};

export const getCards = async (): Promise<FlickrData | null> => {
  console.log('request!', getRequestUrl());

  const response = await fetch(
    `https://api.flickr.com/services/rest/?method=flickr.photos.search&
    api_key=3d4be7ba62a9440ec1196e68fef6afbd
    &text=mountain
    &per_page=10
    &extras=owner_name,description,tags
    &format=json
    &nojsoncallback=1`
  );
  if (!response.ok) {
    throw new Error('Server side error!');
  }
  const data = await response.json();
  return data;
};
