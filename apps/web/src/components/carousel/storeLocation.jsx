export const StoreLocation = ({ deliveried, branch }) => {
  console.log(branch);
  return (
    <div className="font-poppins rounded-lg w-[50%] overflow-hidden ">
      <div
        className={`mx-0 ${
          deliveried ? 'flex justify-center' : 'flex justify-start'
        } laptop:mt-2 laptop:mx-2 laptop: flex laptop:justify-start`}
      >
        <div className="flex flex-col py-2">
          <small className="font-bold laptop:text-sm">
            {branch?.branch_name}
          </small>
          <small className="text-gray-500 text-[10px] laptop:text-sm">
            {branch?.address}
          </small>
        </div>
      </div>
    </div>
  );
};
