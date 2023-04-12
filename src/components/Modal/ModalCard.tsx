import { FC } from 'react';
import { PhotoDetailed } from '../../api/getCards';
import { Details } from './Details';

export const ModalCard: FC<{ onClose: () => void; source: string; details: PhotoDetailed }> = ({
  onClose,
  source,
  details,
}) => {
  return (
    <div
      role="presentation"
      onClick={onClose}
      className=" fixed h-screen overflow-y-auto w-full flex flex-col items-center justify-start bg-stone-800 bg-opacity-50"
    >
      <div
        role="presentation"
        onClick={(event): void => {
          event.stopPropagation();
        }}
        className="m-auto p-2 min-w-1/2 opacity-100 border-2 rounded-lg bg-white border-zinc-300 max-h-min"
      >
        <div className="flex flex-col flex-wrap justify-evenly gap-2">
          <button
            type="button"
            className=" self-end"
            onClick={onClose}
          >
            ❌
          </button>
          <div
            className="self-center h-64 w-full bg-no-repeat bg-contain bg-center"
            style={{ backgroundImage: `url(${source})` }}
          />
          <div className="flex flex-col gap-1">
            <Details details={details} />
          </div>
        </div>
      </div>
    </div>
  );
};
