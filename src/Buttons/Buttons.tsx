import { ButtonHTMLAttributes, FC, MouseEventHandler, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    handler?: MouseEventHandler;
  };

export const ButtonSubmit: FC<ButtonProps> = ({ handler, disabled, children }) => {
  return (
    <button
      onClick={handler}
      type="submit"
      className="self-center w-24 h-10 flex justify-center
  bg-zinc-500 hover:bg-zinc-400 text-white font-bold
  p-1 border-b-4 border-zinc-700 hover:border-zinc-500 rounded
  duration-300 ease-in-out"
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const ButtonButton: FC<ButtonProps> = ({ handler, children }) => {
  return (
    <button
      onClick={handler}
      type="button"
      className="self-center w-24 h-10 flex justify-center
  bg-zinc-500 hover:bg-zinc-400 text-white font-bold
  p-1 border-b-4 border-zinc-700 hover:border-zinc-500 rounded
  duration-300 ease-in-out"
    >
      {children}
    </button>
  );
};
