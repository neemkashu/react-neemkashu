interface PetInfo {
  name: string;
  birth: string;
  type: string;
  sex: string;
  isExperienced: boolean;
  img: string;
}

export const PetCardTextContent = {
  petBirth: 'Birth',
  petShow: 'First show',
} as const;

export const PetCard = ({ name, birth, type, sex, isExperienced, img }: PetInfo) => {
  return (
    <div className="p-2 border-2 rounded-lg bg-white border-zinc-300 shadow-md shadow-zinc-400 max-h-min">
      <div className="flex flex-col flex-wrap justify-evenly gap-2 tiny:flex-row sm:flex-col lg:flex-row">
        <img
          className=" 100 self-center max-w-64 max-h-64"
          src={img}
          alt=""
        />
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl">{name}</h2>
          <h3>
            {type} - {sex}
          </h3>
          <ul>
            <li>
              <strong>
                {PetCardTextContent.petBirth}
                {':'}
              </strong>{' '}
              {birth}
            </li>
            <li>
              <strong>
                {PetCardTextContent.petShow}
                {':'}
              </strong>{' '}
              {isExperienced ? 'yes' : 'no'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
