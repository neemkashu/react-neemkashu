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
