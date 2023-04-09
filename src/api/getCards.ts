const API_KEY = import.meta.env.VITE_API_KEY;

const LOCAL_URL = 'https://api.flickr.com/services/rest/';
// const LOCAL_URL = 'http://localhost:3000/data';
// const LOCAL_URL = 'https://sore-plum-skunk-wig.cyclic.app/data';

interface Owner {
  username: string;
  location: string;
}
interface Tag {
  machine_tag: boolean;
  raw: string;
}
export interface PhotoDetailed {
  id: string;
  server: string;
  farm: number;
  dateuploaded: string;
  rotation: number;
  originalformat: string;
  owner: Owner;
  title?: {
    _content: string;
  };
  description?: {
    _content: string;
  };
  views: number;
  tags: {
    tag: Tag[];
  };
  location?: {
    latitude: string;
    longitude: string;
    accuracy: string;
    context: string;
    locality?: {
      _content: string;
    };
    county?: {
      _content: string;
    };
    region?: {
      _content: string;
    };
    country?: {
      _content: string;
    };
    neighbourhood?: {
      _content: string;
    };
  };
}
export interface PhotoDetailedRaw {
  photo: PhotoDetailed;
  stat: string;
  code?: number;
  message?: string;
}
export interface Photo {
  id: string;
  date_taken: string;
  farm: number;
  title: string;
  views: string;
  secret: string;
  server: string;
  description?: {
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

export const getRequestUrl = (text?: string): string => {
  const url = new URL(LOCAL_URL);
  const params = new URLSearchParams();
  params.set('method', 'flickr.photos.search');
  params.append('api_key', API_KEY);
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

  url.search = params.toString();
  return url.toString();
};

export const getPhotoRequest = (id: string): string => {
  const url = new URL(LOCAL_URL);
  const params = new URLSearchParams();

  params.set('method', 'flickr.photos.getInfo');
  params.append('api_key', API_KEY);
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

export const getCards = async (text?: string): Promise<FlickrData | null> => {
  const response = await fetch(getRequestUrl(text));

  if (!response.ok) {
    throw new Error('Sorry, Flickr error!');
  }
  const data: FlickrData = await response.json();

  if (data.code) {
    throw new Error(data.message);
  }

  return data;
};
