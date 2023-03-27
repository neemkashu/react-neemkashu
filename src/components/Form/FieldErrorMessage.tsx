interface Message {
  message: string;
}

export const FieldErrorMessage = ({ message }: Message): JSX.Element | null => {
  if (!message) return null;
  return <div className="p-1 text-center rounded-lg bg-red-300">{message}</div>;
};
