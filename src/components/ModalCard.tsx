import { FC } from 'react';

export const ModalCard: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className=" fixed h-screen w-full flex flex-col items-center justify-center bg-slate-800 opacity-50 ">
      <p className="w-100 h-20 bg-pink-400">Modal</p>
      <button
        type="button"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};
