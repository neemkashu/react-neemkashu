import { FC } from 'react';
import { CardInfo } from '../../utils/mocha';

export const Card: FC<CardInfo> = ({
  img,
  name,
  type,
  breed,
  age,
  inoculations,
  diseases,
  parasites,
}) => {
  return (
    <div className="p-2 border-2 rounded-lg bg-white border-zinc-300 shadow-md shadow-zinc-400">
      <div className="flex flex-col gap-2 tiny:flex-row sm:flex-col lg:flex-row">
        <img
          className=" 100 self-center w-1/2 xxl:w-auto"
          src={img}
          alt=""
        />
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl">{name}</h2>
          <h3>
            {type} - {breed}
          </h3>
          <ul>
            <li>
              <strong>Age:</strong> {age}
            </li>
            <li>
              <strong>Inoculations:</strong> {inoculations.join(', ')}
            </li>
            <li>
              <strong>Diseases:</strong> {diseases.join(', ')}
            </li>
            <li>
              <strong>Parasites:</strong> {parasites.join(', ')}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
