import { FC } from 'react';

export const ModalCard: FC<{ onClose: () => void; source: string }> = ({ onClose, source }) => {
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
        className="p-2 opacity-100 border-2 rounded-lg bg-white border-zinc-300 max-h-min"
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
            <ul>
              <li>
                <strong>Owner:</strong>
              </li>
              Title
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
