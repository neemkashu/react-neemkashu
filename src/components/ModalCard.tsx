/* eslint-disable no-underscore-dangle */
import { FC } from 'react';
import { PhotoDetailed } from '../api/getCards';
import styles from '../styles/ModalCard.module.css';

export const ModalCard: FC<{ onClose: () => void; source: string; details: PhotoDetailed }> = ({
  onClose,
  source,
  details,
}) => {
  const {
    dateuploaded,
    title,
    description,
    location,
    owner: { username },
    tags: { tag },
  } = details;

  const date = new Date(+dateuploaded).toLocaleDateString();
  const cardTitle = title ? title._content : '';
  const local = location ? location.locality?._content : '';
  const cardDescription = description ? description._content : '';

  return (
    <div
      role="presentation"
      onClick={onClose}
      className=" fixed h-screen w-full flex flex-col items-center justify-center bg-stone-800 bg-opacity-50"
    >
      <div
        role="presentation"
        onClick={(event): void => {
          event.stopPropagation();
        }}
        className=" p-2 w-1/2 opacity-100 border-2 rounded-lg bg-white border-zinc-300 max-h-min"
      >
        <div className="flex flex-col flex-wrap justify-evenly gap-2 tiny:flex-row sm:flex-col lg:flex-row">
          <button
            type="button"
            className=" self-end"
            onClick={onClose}
          >
            ❌
          </button>
          <img
            className="self-center w-auto h-80"
            src={source}
            alt=""
          />
          <div className="flex flex-col gap-1">
            <p> Date: {date}</p>
            <p> Title: {cardTitle}</p>
            <p className={`max-h-40 overflow-y-auto description ${styles.description}`}>
              {' '}
              Description: {cardDescription}
            </p>
            <p>Location: {local}</p>
            <p>
              Tags:{' '}
              {tag
                .map((item) => item.raw)
                .slice(7)
                .join(', ')}
            </p>

            <ul>
              <li>
                <strong>Owner: {username}</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
