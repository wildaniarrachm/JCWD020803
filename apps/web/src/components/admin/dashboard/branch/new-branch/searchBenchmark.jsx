import { Button, Input } from '@material-tailwind/react';

export const SearchBenchmark = ({
  benchmark,
  handleChangebenchmark,
  getDistrick,
  place,
  handlePlace,
  open,
}) => {
  return (
    <div className="relative mx-auto mt-2 w-[60%] justify-between flex gap-3">
      <div className="w-[70%]">
        <Input
          label="Search benchmark: Appartement, place, etc..."
          value={benchmark}
          onChange={(e) => handleChangebenchmark(e?.target?.value)}
        />
      </div>
      <div className="w-[30%]">
        <Button onClick={getDistrick}>Search</Button>
      </div>
      <div
        className={`${
          benchmark && open === true
            ? 'absolute z-10 h-[250px] w-[70%] top-11 rounded-lg bg-white overflow-y-scroll'
            : 'hidden'
        } transition duration-300 `}
      >
        <small className="font-poppins text-gray-600 px-3">
          Found: {place?.length}
        </small>
        {place?.map((place) => (
          <div
            key={place?.id}
            className="p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => handlePlace(place?.center, place?.place_name)}
          >
            <p className="font-poppins p-1">{place?.place_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
