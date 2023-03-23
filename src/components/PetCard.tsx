interface PetInfo {
  name: string;
  birth: string;
  type: string;
  sex: string;
  isExperienced: boolean;
  img: string;
}

export const PetCard = (props: PetInfo) => {
  const { name, birth, type, sex, isExperienced, img } = props;

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
            {type} - {sex}
          </h3>
          <ul>
            <li>
              <strong>Birth:</strong> {birth}
            </li>
            <li>
              <strong>Has ever been in the show:</strong> {isExperienced ? 'yes' : 'no'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
