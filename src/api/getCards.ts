const API_KEY = import.meta.env.VITE_API_KEY;

const LOCAL_URL = 'https://api.flickr.com/services/rest/';
// const LOCAL_URL = 'http://localhost:3000/data';
// const LOCAL_URL = 'https://sore-plum-skunk-wig.cyclic.app/data';

export interface Photo {
  id: string;
  date_taken: string;
  farm: number;
  title: string;
  views: string;
  secret: string;
  server: string;
  description: {
    ['_content']: string;
  };
  owner: string;
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
  code?: number;
  message?: string;
}
const getMinDate = (): string => {
  const year = new Date();
  year.setFullYear(2020);
  return year.getTime().toString();
};

const getRequestUrl = (): string => {
  const url = new URL(LOCAL_URL);
  const params = new URLSearchParams();
  params.set('method', 'flickr.photos.search');
  params.append('api_key', API_KEY);
  params.append('format', 'json');
  params.append('per_page', '10');
  params.append('tags', 'dog,cat');
  params.append('has_geo', 'true');
  params.append('min_taken_date', getMinDate());
  params.append('extras', ['description', 'owner_name', 'date_taken', 'tags', 'views'].join(','));
  params.append('sort', 'date-posted-desc');
  params.append('content_type', '0');
  params.append('nojsoncallback', '1');

  url.search = params.toString();
  return url.toString();
};

export const getCards = async (): Promise<FlickrData | null> => {
  console.log('request!', getRequestUrl());

  const response = await fetch(getRequestUrl());
  if (!response.ok) {
    throw new Error('Sorry, Flickr error!');
  }
  const data: FlickrData = await response.json();

  if (data.code) {
    throw new Error(data.message);
  }

  return data;
};
