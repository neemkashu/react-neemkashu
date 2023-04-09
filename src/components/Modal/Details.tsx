/* eslint-disable no-underscore-dangle */
import { FC } from 'react';
import { PhotoDetailed } from '../../api/getCards';
import { ListItem } from './ListItem';

export const Details: FC<{ details: PhotoDetailed }> = ({ details }) => {
  const {
    dateuploaded,
    title,
    description,
    location,
    owner: { username },
    tags: { tag },
  } = details;
  const date = new Date(+dateuploaded).toLocaleDateString();
  const cardTitle = title ? title._content : 'none';
  const local = location ? location.locality?._content : 'not provided';
  const cardDescription = description ? description._content : 'not provided';
  const tagList = tag
    .map((item) => item.raw)
    .slice(0, 7)
    .join(', ');

  return (
    <ul>
      <ListItem caption="Date">{date}</ListItem>
      <ListItem caption="Title">{cardTitle}</ListItem>
      <ListItem caption="Location">{local}</ListItem>
      <ListItem caption="Tags">{tagList}</ListItem>
      <ListItem caption="Owner">{username}</ListItem>
      <ListItem caption="Description">
        <p className=" min-h-0">{cardDescription}</p>
      </ListItem>
    </ul>
  );
};
